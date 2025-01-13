import React, { useState } from "react"; // React'ı buraya ekleyin
import { Box, Dialog, IconButton, Stack } from "@mui/material";
import { Close, Menu as MenuIcon } from "@mui/icons-material";

interface NameProps {
    className: string;
}

const BurgerMenu: React.FC<NameProps> = ({ className }) => {
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <>
            <Box className={className}>
                <IconButton style={{color:"#8B6DE8"}} onClick={() => setOpen(!open)}>
                    {open ? <Close /> : <MenuIcon />}
                </IconButton>
                <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
                    <Box sx={{ backgroundColor: "#fff", color: "#333", marginTop: "60px" }}>   
                        <Stack className="burger_container" flexDirection="column" alignItems="center" gap="20px" padding={2}>
                   
                        </Stack>
                    </Box>
                </Dialog>
            </Box>
        </>
    );
};

export default BurgerMenu;