import {Box, useMediaQuery} from "@mui/material";
import NavBar from "../navBar";
import UserWidget from "../widgets/UserWidget";
import {useSelector} from "react-redux";



const HomePage = () => {
    const isNonMobile=useMediaQuery("(min-width: 1000px)");
    const {_id, picturePath} = useSelector(state => state.user);
    return (
        <Box>
            <NavBar/>
            <Box
            width={"100%"}
            padding={"2rem 6%"}
            display={isNonMobile ? "flex" : "block"}
            gap={"0.5rem"}
            justifyContent={"space-between"}
            >
                <Box
                    flexBasis={isNonMobile ? "26%" : undefined}
                >
                    <UserWidget userId={_id} picturePath={picturePath}/>
                </Box>
                <Box
                    flexBasis={isNonMobile ? "42%" : undefined}
                    mt={isNonMobile ? undefined : "2rem"}
                >

                </Box>
            </Box>
        </Box>
    )
};
export default HomePage;