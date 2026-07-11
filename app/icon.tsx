import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FAF7F3">
          <path d="M13 0 2 14h7l-2 10L22 8h-8l-1-8Z" />
        </svg>
      </div>
    ),
    size,
  );
}
