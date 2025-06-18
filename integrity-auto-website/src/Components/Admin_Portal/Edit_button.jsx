// src/Components/Admin_Portal/Edit_button.jsx
import ButtonIcon from "./button_icon";

const icons = {
  UploadImage: "ArrowUpTrayIconOutline",
  // Add more icons here
};

export default function EditButton({ btn, click}) {
  const icon = icons[btn];
  if (!icon) return null;

  return (
    <div className="edit_button">
      <ButtonIcon btn={icon} />
    </div>
  );
}

