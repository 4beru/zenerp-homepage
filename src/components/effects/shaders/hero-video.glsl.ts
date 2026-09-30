/**
 * Zen ERP — Creative Software Studio
 * Hero WebGL Custom Shaders
 *
 * Responsibilities:
 * - Orthographic projection with UV coordinate mapping
 * - Responsive aspect-ratio cover transformation
 * - Organic low-frequency wave displacement field
 * - Mouse velocity-driven dynamic local distortion
 * - Atmospheric depth and legibility protection for foreground editorial typography
 */

export const heroVideoVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const heroVideoFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uVideoResolution;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform float uMouseStrength;
uniform float uDistortion;
uniform float uScrollProgress;
uniform float uOpacity;
uniform float uHasVideo;

// Calculate cover UVs to preserve original video aspect ratio without stretching
vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 videoRes) {
  if (videoRes.x <= 0.0 || videoRes.y <= 0.0 || screenRes.x <= 0.0 || screenRes.y <= 0.0) {
    return uv;
  }
  float screenAspect = screenRes.x / screenRes.y;
  float videoAspect = videoRes.x / videoRes.y;
  vec2 scale = vec2(1.0);

  if (screenAspect > videoAspect) {
    scale = vec2(1.0, screenAspect / videoAspect);
  } else {
    scale = vec2(videoAspect / screenAspect, 1.0);
  }

  return (uv - 0.5) * scale + 0.5;
}

void main() {
  // 1. Calculate aspect-corrected cover UV
  vec2 coverUv = getCoverUv(vUv, uResolution, uVideoResolution);

  // 2. Continuous low-amplitude organic wave field (ambient idle motion)
  float slowTime = uTime * 0.16;
  vec2 organicWave = vec2(
    sin(coverUv.y * 3.8 + slowTime) * 0.55 + cos(coverUv.x * 2.6 - slowTime * 0.75) * 0.45,
    cos(coverUv.x * 3.4 + slowTime) * 0.55 + sin(coverUv.y * 2.2 - slowTime * 0.85) * 0.45
  ) * uDistortion;

  // 3. Pointer interaction in aspect-corrected space
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uvAspect = vec2(coverUv.x * aspect, coverUv.y);
  vec2 mouseAspect = vec2(uMouse.x * aspect, uMouse.y);

  float distToMouse = distance(uvAspect, mouseAspect);
  float radius = 0.38; // Soft influence radius
  float mouseInfluence = smoothstep(radius, 0.0, distToMouse);

  // Velocity-driven displacement vector (direction of movement + gentle outward expansion)
  vec2 mouseDir = uMouseVelocity * 0.65 + (uvAspect - mouseAspect) * 0.08;
  vec2 mouseDisp = mouseDir * mouseInfluence * uMouseStrength;

  // Scroll influence (subtle vertical shift as Hero exits)
  vec2 scrollDisp = vec2(0.0, uScrollProgress * 0.08);

  // 4. Synthesize final UV coordinate with edge clamping
  vec2 finalUv = coverUv + organicWave + mouseDisp + scrollDisp;
  finalUv = clamp(finalUv, 0.001, 0.999);

  // 5. Texture sampling & rendering
  vec4 finalColor;

  if (uHasVideo > 0.5) {
    // Sample video texture
    vec4 videoTex = texture2D(uTexture, finalUv);

    // Controlled color treatment: preserve native video tonality (cyan/blue & warm highlights)
    vec3 color = videoTex.rgb;

    // Subtle edge vignette
    vec2 d = abs(vUv - 0.5) * 2.0;
    float vignette = 1.0 - dot(d, d) * 0.22;
    vignette = clamp(vignette, 0.0, 1.0);
    color *= vignette;

    // Soft editorial left/bottom gradient to ensure perfect legibility of the oversized headline & description
    float textLegibilityMask = smoothstep(0.1, 0.85, vUv.x);
    float verticalMask = smoothstep(0.05, 0.4, vUv.y);
    float compositeMask = mix(0.72, 1.0, textLegibilityMask * verticalMask);
    color *= compositeMask;

    finalColor = vec4(color, videoTex.a * uOpacity);
  } else {
    // Graceful fallback when video asset is pending or unavailable:
    // Aesthetic dark ambient topographic field matching Zen ERP identity (#050505 environment)
    float baseGrid = sin(finalUv.x * 25.0 + uTime * 0.2) * sin(finalUv.y * 25.0 - uTime * 0.15);
    float waves = sin(finalUv.y * 6.0 + slowTime * 2.0 + sin(finalUv.x * 4.0)) * 0.5 + 0.5;
    
    // Deep cyan & terracotta ambient glows
    vec3 cyanGlow = vec3(0.04, 0.14, 0.18) * waves;
    vec3 accentGlow = vec3(0.08, 0.03, 0.01) * (1.0 - waves);
    vec3 baseColor = vec3(0.02, 0.02, 0.02) + cyanGlow + accentGlow + baseGrid * 0.015;

    // Left fade for headline legibility
    float leftFade = smoothstep(0.05, 0.7, vUv.x);
    baseColor *= leftFade;

    finalColor = vec4(baseColor, 0.85 * uOpacity);
  }

  gl_FragColor = finalColor;
}
`;
