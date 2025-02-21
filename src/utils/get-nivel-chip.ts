export type Nivel = "Fácil" | "Médio" | "Difícil" | string;

export function getNivelChipProps(nivel: Nivel) {
    switch (nivel) {
      case "Fácil":
        return {
          label: "Fácil",
          color: "default" as const, 
          sx: {
            fontWeight: 500,
            ml: 2,
            backgroundColor: "#effdef", 
            color: "#32a44f",   
          },
        };
      case "Médio":
        return {
          label: "Médio",
          color: "default" as const,
          sx: {
            fontWeight: 500,
            ml: 2,
            backgroundColor: "#fff9e6", 
            color: "#f5a623",  
          },
        };
      case "Difícil":
        return {
          label: "Difícil",
          color: "default" as const,
          sx: {
            fontWeight: 500,
            ml: 2,
            backgroundColor: "#feeef0", 
            color: "#d93848",
          },
        };
      default:
        return {
          label: nivel,
          color: "default" as const,
          sx: {
            fontWeight: 500,
            ml: 2,
          },
        };
    }
  }
  