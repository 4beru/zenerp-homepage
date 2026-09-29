import { PrismaClient } from "@prisma/client";

// In-memory fallback store for when database is offline or not configured
const inMemoryStore: Record<string, any[]> = {
  lead: [],
};

const createMockModel = (modelName: string) => ({
  findMany: async () => inMemoryStore[modelName] ?? [],
  findFirst: async () => inMemoryStore[modelName]?.[0] ?? null,
  findUnique: async () => inMemoryStore[modelName]?.[0] ?? null,
  create: async (args: { data: any }) => {
    const record = {
      id: `mock_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date(),
      ...args?.data,
    };
    if (!inMemoryStore[modelName]) inMemoryStore[modelName] = [];
    inMemoryStore[modelName].push(record);
    return record;
  },
  update: async (args: { data: any }) => args?.data ?? {},
  delete: async () => ({}),
});

let prismaClient: any;

try {
  if (!process.env.DATABASE_URL) {
    console.warn("[AI Studio] DATABASE_URL not set — using in-memory mock database");
    prismaClient = new Proxy(
      {},
      {
        get: (_, model: string) => createMockModel(model.toLowerCase()),
      }
    );
  } else {
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };
    prismaClient =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: ["warn", "error"],
      });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClient;
    }
  }
} catch (e) {
  console.warn("[AI Studio] PrismaClient initialization failed — using mock database:", e);
  prismaClient = new Proxy(
    {},
    {
      get: (_, model: string) => createMockModel(model.toLowerCase()),
    }
  );
}

// Wrap with fallback proxy in case query execution fails at runtime
export const db: any = new Proxy(prismaClient, {
  get(target, prop: string) {
    const orig = target[prop];
    if (typeof orig === "object" && orig !== null) {
      return new Proxy(orig, {
        get(modelTarget, action: string) {
          const origAction = modelTarget[action];
          if (typeof origAction === "function") {
            return async (...args: any[]) => {
              try {
                return await origAction.apply(modelTarget, args);
              } catch (err) {
                console.warn(
                  `[AI Studio] DB operation ${prop}.${action} failed, falling back to mock:`,
                  err
                );
                const mockModel = createMockModel(prop.toLowerCase());
                return await (mockModel as any)[action]?.(...args);
              }
            };
          }
          return origAction;
        }
      });
    }
    if (orig === undefined) {
      return createMockModel(prop.toLowerCase());
    }
    return orig;
  },
});
