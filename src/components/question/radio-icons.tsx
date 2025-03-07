import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export function getRadioIcons(
  wasSubmitted: boolean | undefined,
  isCorrect: boolean,
  isSelected: boolean
) {
  let icon = <RadioButtonUncheckedIcon />;
  let checkedIcon = <RadioButtonCheckedIcon />;

  if (wasSubmitted) {
    if (isCorrect) {
      if (isSelected) {
        icon = <CheckCircleIcon style={{ color: "green" }} />;
        checkedIcon = <CheckCircleIcon style={{ color: "green" }} />;
      } else {
        icon = (
          <CheckCircleIcon style={{ color: "green", opacity: 0.5 }} />
        );
        checkedIcon = (
          <CheckCircleIcon style={{ color: "green", opacity: 0.5 }} />
        );
      }
    } else if (isSelected) {
      icon = <CancelIcon style={{ color: "red" }} />;
      checkedIcon = <CancelIcon style={{ color: "red" }} />;
    }
  }
  return { icon, checkedIcon };
}