import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const profile = await getProfile();
  const fullName = profile?.full_name ?? "Ayodele John";
  const tagline = profile?.tagline ?? "SOFTWARE ENGINEER";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#111111",
          color: "#FAF7F3",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "rgba(250,247,243,0.6)" }}>
          {tagline}
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, display: "flex" }}>
          {fullName}
        </div>
      </div>
    ),
    size,
  );
}
