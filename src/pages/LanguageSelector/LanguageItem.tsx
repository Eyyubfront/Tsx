import React from "react";
import { selectLanguage } from "../../store/slice/languageSlice";
import { Language } from "../../types/Types";
import { ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/index";

interface LanguageState {
  selectedLanguage: Language | null;
}

interface LanguageItemProps {
  language: Language;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ language }) => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector((state: { language: LanguageState }) => state.language.selectedLanguage);

  const handleSelect = () => {
    dispatch(selectLanguage(language));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleSelect}
        selected={selectedLanguage?.id === language.id}
        sx={{
          borderRadius: 1,
          "&.Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.12)",
          },
        }}
      >
        <ListItemIcon>
          <img 
            src={language.image}
            alt={`${language.name} flag`} 
            style={{ width: '30px', height: '20px', objectFit: 'cover' }} 
          />
        </ListItemIcon>
        <ListItemText primary={language.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default LanguageItem;