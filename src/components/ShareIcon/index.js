import React, { useRef, useState, useEffect } from 'react'
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    LinkedinIcon
} from "react-share";

const ShareIcon = ({ url, title }) => {
    useEffect(() => {
        console.log('testabc',url,title)
        setshareUrl(url)
        setsharetitle(title)
    }, [url, title])
    const [anchorEl, setAnchorEl] = useState(null);
    const [shareUrl, setshareUrl] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');
    const [sharetitle, setsharetitle] = useState(null);
    const textAreaRef = useRef(null);


    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    if(!shareUrl){
        return null
    }

   
    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <ShareOutlinedIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem >
                    <FacebookShareButton
                        url={shareUrl}
                        quote={sharetitle}
                        className="Demo__some-network__share-button"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </MenuItem>
                <MenuItem >
                    <TwitterShareButton
                        url={shareUrl}
                        title={sharetitle}
                        className="Demo__some-network__share-button"
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </MenuItem>
                <MenuItem >
                    <WhatsappShareButton
                        url={shareUrl}
                        title={sharetitle}
                        separator=":: "
                        className="Demo__some-network__share-button"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </MenuItem>
                <MenuItem >
                    <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                </MenuItem>
                <MenuItem >
                    <EmailShareButton
                        url={shareUrl}
                        subject={sharetitle}
                        body="Here is an interesting link I have found "
                        className="Demo__some-network__share-button"
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </MenuItem>
                <MenuItem>
                    {
                        document.queryCommandSupported('copy') &&
                            <AttachmentIcon onClick={copyToClipboard}></AttachmentIcon>
                    }
                    <textarea
                        style={{width:'0',maxHeight: '2px',opacity: 0}}
                        ref={textAreaRef}
                        value={shareUrl}
                    />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ShareIcon
