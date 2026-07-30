import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
        }}
      >
        <svg width="108" height="108" viewBox="0 0 24 24" fill="#FAF7F3">
          <path d="M13 0 2 14h7l-2 10L22 8h-8l-1-8Z" />
        </svg>
      </div>
    ),
    size,
  );
}
