import { useTheme } from "@mui/material/styles";

// Marsh primitive color palettes
const palettes = [
  {
    label: "Blues",
    colors: [
      { name: "Blue 900", value: "#00143A" },
      { name: "Blue 800", value: "#001F51" },
      { name: "Blue 700", value: "#002B78" },
      { name: "Blue 600", value: "#0066AB" },
      { name: "Blue 500", value: "#009EDFFF" },
      { name: "Blue 400", value: "#3BB7F0" },
      { name: "Blue 300", value: "#75D4FF" },
      { name: "Blue 200", value: "#9EE0FF" },
      { name: "Blue 100", value: "#C7EDFF" },
      { name: "Blue 50", value: "#F0FAFF" }
    ]
  },
  {
    label: "Grays",
    colors: [
      { name: "Gray 1000", value: "#000000" },
      { name: "Gray 950", value: "#101010" },
      { name: "Gray 900", value: "#222222" },
      { name: "Gray 800", value: "#3A3A3A" },
      { name: "Gray 700", value: "#565656" },
      { name: "Gray 600", value: "#767676" },
      { name: "Gray 550", value: "#808080" },
      { name: "Gray 525", value: "#888888" },
      { name: "Gray 500", value: "#949494" },
      { name: "Gray 400", value: "#B2B2B2" },
      { name: "Gray 300", value: "#D8D8D8" },
      { name: "Gray 200", value: "#E3E3E3" },
      { name: "Gray 100", value: "#EBEBEB" },
      { name: "Gray 50", value: "#F5F5F5" },
      { name: "Gray 0", value: "#FFFFFF" }
    ]
  },
  {
    label: "Blue Gray",
    colors: [
      { name: "Blue Gray 900", value: "#1C212E" },
      { name: "Blue Gray 850", value: "#293246" },
      { name: "Blue Gray 800", value: "#36425C" },
      { name: "Blue Gray 700", value: "#4F6187" },
      { name: "Blue Gray 600", value: "#6078A0" },
      { name: "Blue Gray 500", value: "#8096B3" },
      { name: "Blue Gray 400", value: "#A3B7CC" },
      { name: "Blue Gray 300", value: "#BFD4E3" },
      { name: "Blue Gray 200", value: "#D1E0ED" },
      { name: "Blue Gray 100", value: "#E6EDF5" },
      { name: "Blue Gray 75", value: "#F2F5FA" },
      { name: "Blue Gray 50", value: "#F7F9FC" }
    ]
  },
  {
    label: "Turquoise",
    colors: [
      { name: "Turquoise 900", value: "#002323" },
      { name: "Turquoise 800", value: "#004040" },
      { name: "Turquoise 700", value: "#005E5C" },
      { name: "Turquoise 600", value: "#007A76" },
      { name: "Turquoise 500", value: "#009792" },
      { name: "Turquoise 400", value: "#4CBAB0" },
      { name: "Turquoise 300", value: "#99DBCF" },
      { name: "Turquoise 200", value: "#B7E8DE" },
      { name: "Turquoise 100", value: "#D7F2ED" },
      { name: "Turquoise 50", value: "#F5FFFC" }
    ]
  },
  {
    label: "Teal",
    colors: [
      { name: "Teal 900", value: "#00212E" },
      { name: "Teal 800", value: "#003653" },
      { name: "Teal 700", value: "#004C6B" },
      { name: "Teal 600", value: "#006187" },
      { name: "Teal 500", value: "#0078A1" },
      { name: "Teal 400", value: "#4FA8C2" },
      { name: "Teal 300", value: "#9BD7E3" },
      { name: "Teal 200", value: "#B7E5ED" },
      { name: "Teal 100", value: "#D5F2F6" },
      { name: "Teal 50", value: "#F0FCFF" }
    ]
  },
  {
    label: "Green",
    colors: [
      { name: "Green 900", value: "#103922" },
      { name: "Green 800", value: "#1F4027" },
      { name: "Green 700", value: "#255B38" },
      { name: "Green 600", value: "#14843D" },
      { name: "Green 500", value: "#00AB40" },
      { name: "Green 400", value: "#56C77B" },
      { name: "Green 300", value: "#ADE0B3" },
      { name: "Green 200", value: "#C4EBC9" },
      { name: "Green 100", value: "#DBF5DE" },
      { name: "Green 50", value: "#F2FFF5" }
    ]
  },
  {
    label: "Yellow",
    colors: [
      { name: "Yellow 900", value: "#2E1C00" },
      { name: "Yellow 800", value: "#613C00" },
      { name: "Yellow 700", value: "#965C00" },
      { name: "Yellow 600", value: "#CA8700" },
      { name: "Yellow 500", value: "#FFD000" },
      { name: "Yellow 400", value: "#FFE041" },
      { name: "Yellow 300", value: "#FFE680" },
      { name: "Yellow 200", value: "#FFEDA6" },
      { name: "Yellow 100", value: "#FFF5CA" },
      { name: "Yellow 50", value: "#FFFDF0" }
    ]
  },
  {
    label: "Crimson",
    colors: [
      { name: "Crimson 900", value: "#390A0A" },
      { name: "Crimson 800", value: "#690F14" },
      { name: "Crimson 700", value: "#991C1F" },
      { name: "Crimson 600", value: "#C43533" },
      { name: "Crimson 500", value: "#F04F45" },
      { name: "Crimson 400", value: "#F97D75" },
      { name: "Crimson 300", value: "#FFB0A6" },
      { name: "Crimson 200", value: "#FFD6D1" },
      { name: "Crimson 100", value: "#FFE9E7" },
      { name: "Crimson 50", value: "#FFF6F5" }
    ]
  },
  {
    label: "Pink",
    colors: [
      { name: "Pink 900", value: "#3D0020" },
      { name: "Pink 800", value: "#78023D" },
      { name: "Pink 700", value: "#B3015B" },
      { name: "Pink 600", value: "#D32173" },
      { name: "Pink 500", value: "#ED3C8C" },
      { name: "Pink 400", value: "#F476B1" },
      { name: "Pink 300", value: "#F9B3D1" },
      { name: "Pink 200", value: "#FDD6E7" },
      { name: "Pink 100", value: "#FFE9F3" },
      { name: "Pink 50", value: "#FFF6FB" }
    ]
  },
  {
    label: "Orange",
    colors: [
      { name: "Orange 900", value: "#331200" },
      { name: "Orange 800", value: "#6B1F00" },
      { name: "Orange 700", value: "#A62E00" },
      { name: "Orange 600", value: "#C95600" },
      { name: "Orange 500", value: "#FF8C00" },
      { name: "Orange 400", value: "#FFAB4A" },
      { name: "Orange 300", value: "#FFD19A" },
      { name: "Orange 200", value: "#FFE2C4" },
      { name: "Orange 100", value: "#FFF2E0" },
      { name: "Orange 50", value: "#FFF9F5" }
    ]
  },
  {
    label: "Purple",
    colors: [
      { name: "Purple 900", value: "#1A112F" },
      { name: "Purple 800", value: "#311F59" },
      { name: "Purple 700", value: "#443282" },
      { name: "Purple 600", value: "#633E99" },
      { name: "Purple 500", value: "#8244B0" },
      { name: "Purple 400", value: "#A47BCC" },
      { name: "Purple 300", value: "#C7B3E3" },
      { name: "Purple 200", value: "#D9C9ED" },
      { name: "Purple 100", value: "#EBE3F5" },
      { name: "Purple 50", value: "#F7F5FC" }
    ]
  }
];

export const ColorSwatches = () => {
  const theme = useTheme();
  const small = theme.typography.caption.fontSize as any;
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
