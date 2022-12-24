import React, { useEffect, useRef } from 'react';

import { Splide } from '@splidejs/react-splide';
import {Video} from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

const About = () => {

    const ids = [
        '1HygThMLzGs',
        'mAkjETPM1s4',
    ];

    const splideOptionsShow = {
        video: {
            autoplay: false,
            mute: false,
        },
    };

    const splideOptionstThumb = {
        video: {
            autoplay: false,
            mute: true,
        },
        isNavigation: true,
    };

    const Videos = ({ ids, big }) => (
        <>
            {ids.map((id, key) => (
                <li
                    className="splide__slide"
                    data-splide-youtube={`https://www.youtube.com/embed/${id}`}
                    key={key}
                >
                    <img
                        src={
                            `https://img.youtube.com/vi/${id}/` +
                            (big ? 'hqdefault.jpg' : 'mqdefault.jpg')
                        }
                        alt="video thumbnail"
                    />
                </li>
            ))}
        </>
    );

    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        slider1.current.sync(slider2.current.splide);
    }, [slider1, slider2]);

    return (
        <>
            <Splide
                ref={(slider) => (slider1.current = slider)}
                options={splideOptionsShow}
                Extensions={{ Video }}
            >
                <Videos ids={ids} big={true} />
            </Splide>
            <Splide
                ref={(slider) => (slider2.current = slider)}
                options={splideOptionstThumb}
                Extensions={{ Video }}
            >
                <Videos ids={ids} big={false} />
            </Splide>
        </>
    );
}

export default About;