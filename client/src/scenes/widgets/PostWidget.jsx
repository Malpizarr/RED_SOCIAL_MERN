import {
    EditOutlined,
    DeleteOutline,
   AttachFileOutlined,
    GifBoxOutlined,
    MicOutlined,
    MoreHorizOutlined, ImageOutlined
} from "@mui/icons-material";
import {Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgwtWrapper from "components/WidgwtWrapper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "state";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const PostWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);

        }

        const rep = await fetch("http://localhost:3001/posts", {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`},
                body: formData,
            }
        );
        const posts = await rep.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost("");
    };

    return (
        <WidgwtWrapper>
            <FlexBetween gap={"1.5rem"}>
                <UserImage image={picturePath}/>
                <InputBase
                    placeholder={"..."}
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                >
                </InputBase>
            </FlexBetween>
            {isImage && (
                <Box
                    width={"100%"}
                    border={`1px dashed ${medium}`}
                    borderRadius={"5px"}
                    m={"1rem"}
                    p={"1rem"}

                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png,.gif"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({getRootProps, getInputProps}) => (
                            <FlexBetween>
                            <Box
                                {...getRootProps()}
                                width={"100%"}
                                border={`2px dashed ${palette.primary.main}`}
                                p="1rem"
                                sx={{"&:hover": {cursor: "pointer"}}}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Añade una Imagen</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined/>
                                    </FlexBetween>
                                )}
                            </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)}
                                    sx={{width: "15px"}}>

                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )
            }

            <Divider sx={{margin: "1.2rem"}}/>

            <FlexBetween>

                <FlexBetween gap={"0.25rem"} onClick={()=>setIsImage(!isImage)}>

                <ImageOutlined sx={{color: mediumMain}} />
                <Typography sx={{"&:hover": {cursor: "pointer", color: medium}}}>
                    Imagen
                </Typography>

                </FlexBetween>

                {isNonMobile ? (
                    <>
                        <FlexBetween gap={"0.25rem"}>
                            <GifBoxOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>
                                GIF
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap={"0.25rem"}>
                            <AttachFileOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>
                                Documento
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap={"0.25rem"}>
                            <MicOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap={"0.25rem"}>
                    <MoreHorizOutlined sx={{color: mediumMain}}/>
                    </FlexBetween>
                )}


                <Button
                onClick={handlePost}
                sx={{color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",}}
                >
                    Publicar
                </Button>
            </FlexBetween>
        </WidgwtWrapper>
    )
};

export default PostWidget;

