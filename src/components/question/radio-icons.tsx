import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export function RadioIcons(
  foiSubmetido: boolean | undefined,
  isCorreta: boolean,
  isSelecionada: boolean
) {
  let icon = <RadioButtonUncheckedIcon />;
  let checkedIcon = <RadioButtonCheckedIcon />;

  if (foiSubmetido) {
    if (isCorreta) {
      if (isSelecionada) {
        icon = <CheckCircleIcon style={{ color: "green" }} />;
        checkedIcon = <CheckCircleIcon style={{ color: "green" }} />;
      } else {
        icon = <CheckCircleIcon style={{ color: "green", opacity: 0.5 }} />;
        checkedIcon = <CheckCircleIcon style={{ color: "green", opacity: 0.5 }} />;
      }
    } else {
      if (isSelecionada) {
        icon = <CancelIcon style={{ color: "red" }} />;
        checkedIcon = <CancelIcon style={{ color: "red" }} />;
      } else {
        icon = <RadioButtonUncheckedIcon />;
        checkedIcon = <RadioButtonCheckedIcon />;
      }
    }
  }
  return { icon, checkedIcon };
}