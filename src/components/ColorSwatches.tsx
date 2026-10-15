// roles-allow-hex-file — this component *displays* the primitive palette;
// the hex values are its content, not styling that should use a role.
import { useTheme } from "@mui/material/styles";

// Marsh primitive color palettes — aligned to Figma "Primitive Colors" collection
// 7 uniform palettes × 14 stops (50–1000) + Utilities + Static
const palettes = [
  {
    label: "Blue",
    colors: [
      { name: "Blue 1000", value: "#000f47" },
      { name: "Blue 950", value: "#021b6c" },
      { name: "Blue 900", value: "#042791" },
      { name: "Blue 800", value: "#093fda" },
      { name: "Blue 750", value: "#0b4bff" },
      { name: "Blue 700", value: "#1f60ff" },
      { name: "Blue 600", value: "#478aff" },
      { name: "Blue 500", value: "#6fb4ff" },
      { name: "Blue 400", value: "#95caff" },
      { name: "Blue 300", value: "#bbe1ff" },
      { name: "Blue 250", value: "#ceecff" },
      { name: "Blue 200", value: "#d8f0ff" },
      { name: "Blue 100", value: "#ebf7ff" },
      { name: "Blue 50", value: "#f5fbff" }
    ]
  },
  {
    label: "Gold",
    colors: [
      { name: "Gold 1000", value: "#cb7623" },
      { name: "Gold 950", value: "#d5831c" },
      { name: "Gold 900", value: "#e09015" },
      { name: "Gold 800", value: "#f5a907" },
      { name: "Gold 750", value: "#ffb700" },
      { name: "Gold 700", value: "#ffab14" },
      { name: "Gold 600", value: "#ffa02e" },
      { name: "Gold 500", value: "#ff994a" },
      { name: "Gold 400", value: "#ffbd84" },
      { name: "Gold 300", value: "#ffe0bd" },
      { name: "Gold 250", value: "#fff2da" },
      { name: "Gold 200", value: "#fff5e1" },
      { name: "Gold 100", value: "#fff8ed" },
      { name: "Gold 50", value: "#fffcf8" }
    ]
  },
  {
    label: "Green",
    colors: [
      { name: "Green 1000", value: "#2f7d32" },
      { name: "Green 950", value: "#3a8a32" },
      { name: "Green 900", value: "#449631" },
      { name: "Green 800", value: "#54a731" },
      { name: "Green 750", value: "#64bc30" },
      { name: "Green 700", value: "#6cc044" },
      { name: "Green 600", value: "#7cc664" },
      { name: "Green 500", value: "#8dcc92" },
      { name: "Green 400", value: "#addbae" },
      { name: "Green 300", value: "#ceeac9" },
      { name: "Green 250", value: "#def2d7" },
      { name: "Green 200", value: "#e5f5df" },
      { name: "Green 100", value: "#f2faef" },
      { name: "Green 50", value: "#f8fcf7" }
    ]
  },
  {
    label: "Red",
    colors: [
      { name: "Red 1000", value: "#8b1a1a" },
      { name: "Red 950", value: "#9d201f" },
      { name: "Red 900", value: "#af2625" },
      { name: "Red 800", value: "#d33330" },
      { name: "Red 750", value: "#e53935" },
      { name: "Red 700", value: "#ec4540" },
      { name: "Red 600", value: "#f55555" },
      { name: "Red 500", value: "#ff6b6b" },
      { name: "Red 400", value: "#ff9d9d" },
      { name: "Red 300", value: "#ffcfcf" },
      { name: "Red 250", value: "#ffe8e8" },
      { name: "Red 200", value: "#ffeded" },
      { name: "Red 100", value: "#fff4f4" },
      { name: "Red 50", value: "#fffafa" }
    ]
  },
  {
    label: "Purple",
    colors: [
      { name: "Purple 1000", value: "#5e0f95" },
      { name: "Purple 950", value: "#6a18a3" },
      { name: "Purple 900", value: "#7720b0" },
      { name: "Purple 800", value: "#842daf" },
      { name: "Purple 750", value: "#8f37c6" },
      { name: "Purple 700", value: "#ab5aea" },
      { name: "Purple 600", value: "#b96bf5" },
      { name: "Purple 500", value: "#c88fff" },
      { name: "Purple 400", value: "#dcbaff" },
      { name: "Purple 300", value: "#e9d3ff" },
      { name: "Purple 250", value: "#f2e6ff" },
      { name: "Purple 200", value: "#f7ebfe" },
      { name: "Purple 100", value: "#fcf1fc" },
      { name: "Purple 50", value: "#fef8fe" }
    ]
  },
  {
    label: "Gray",
    colors: [
      { name: "Gray 1000", value: "#303c37" },
      { name: "Gray 950", value: "#3e4944" },
      { name: "Gray 900", value: "#4d5551" },
      { name: "Gray 800", value: "#6a6e6b" },
      { name: "Gray 750", value: "#787b78" },
      { name: "Gray 700", value: "#8a8c88" },
      { name: "Gray 600", value: "#9c9e9a" },
      { name: "Gray 500", value: "#b4b6b1" },
      { name: "Gray 400", value: "#cfd0cd" },
      { name: "Gray 300", value: "#eaebea" },
      { name: "Gray 250", value: "#f7f8f8" },
      { name: "Gray 200", value: "#f9f9f9" },
      { name: "Gray 100", value: "#fbfbfb" },
      { name: "Gray 50", value: "#fdfefe" }
    ]
  },
  {
    label: "Neutral",
    colors: [
      { name: "Neutral 1000", value: "#000000" },
      { name: "Neutral 950", value: "#101010" },
      { name: "Neutral 900", value: "#252525" },
      { name: "Neutral 800", value: "#3b3b3b" },
      { name: "Neutral 750", value: "#4a4a4a" },
      { name: "Neutral 700", value: "#595959" },
      { name: "Neutral 600", value: "#767676" },
      { name: "Neutral 500", value: "#878787" },
      { name: "Neutral 400", value: "#a8a8a8" },
      { name: "Neutral 300", value: "#c4c4c4" },
      { name: "Neutral 250", value: "#dadada" },
      { name: "Neutral 200", value: "#e3e3e3" },
      { name: "Neutral 100", value: "#eeeeee" },
      { name: "Neutral 50", value: "#f8f8f8" }
    ]
  },
  {
    label: "Utilities",
    colors: [
      { name: "Critical", value: "#c53532" },
      { name: "Warning", value: "#cb7e03" },
      { name: "Success", value: "#14853d" },
      { name: "Info", value: "#6fb4ff" }
    ]
  }
];

export const ColorSwatches = () => {
  const theme = useTheme();
  const small = theme.typography.caption.fontSize;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {palettes.map((palette) => (
        <div key={palette.label}>
          <h3 style={{ marginBottom: "0.5rem" }}>{palette.label}</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {palette.colors.map((color) => (
              <div key={color.name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: color.value,
                    border: "1px solid #eee",
                    marginBottom: 8
                  }}
                />
                <div style={{ fontSize: small }}>{color.name}</div>
                <div style={{ fontSize: small, color: "#888" }}>{color.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
