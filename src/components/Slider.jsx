import React from 'react';
import Slider from 'react-slick';
import { Box, Container, Paper } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  { src: 'Seb0906e0aacb4b4e86e9f361a9cad287B.jpg', alt: 'Watch 1' },
  { src: '46b6bcc99a9ff7d4cb024040b645b4c5.jpg', alt: 'Watch 2' },
  { src: '174b111870c23a109572be03c36d3f8b.jpg', alt: 'Watch 3' },
  { src: '37146c0d9ace661d9c9afe5e6fb996e7.jpg', alt: 'Watch 4' },
  { src: 'S7fb0d49cc9754d578aed6e0e276e40aeG.jpg', alt: 'Watch 5' },
  { src: 'S26c92e7642904201abe3dc7bd379cd00u.jpg', alt: 'Watch 6' },
  { src: 'S62a862edfc3245e3847a29e7262be204Y.jpg', alt: 'Watch 7' },
  { src: 'Sc871257fffaf41b2ae57669a04af0781v.jpg', alt: 'Watch 8' },
  { src: '6c10fe7ee910b71e872dca0dddbfd072.jpg', alt: 'Watch 9' },
];

const SliderImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 2, // Show 2 images at a time
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1, // Show only 1 on smaller screens
        },
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', p: 1 }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                px: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: 260, sm: 360, md: 400 },
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Paper>
    </Container>
  );
};

export default SliderImage;
