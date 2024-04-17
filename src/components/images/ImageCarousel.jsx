import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { fetchDigitalOceanUrlForImage } from "redux/fileUpload/service";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { resizeThumbnail } from "../../util/ImageResizer";

const ImagesCarousel = ({ images, onIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);
  const useCatalogPermission = useRolePermissions("CATALOG");

  useEffect(() => {
    setCarouselImages(images);
  }, [images]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        320,
        480,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const handleThumnail = async (file) => {
    fetch(file)
      .then(async (res) => {
        return res.blob();
      })
      .then(async (blob) => {
        const image = await resizeThumbnail(blob);
        fetchDigitalOceanUrlForImage().then(async (res) => {
          try {
            handleSubmission(res.data.url, image.type, image);
          } catch (err) {
            console.log(err);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmission = (url, contentType, selectedFile) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const headers = {
        "Content-Type": contentType,
        "x-amz-acl": "public-read",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Origin": "*",
      };
      fetch(url, { method: "PUT", body: selectedFile, headers })
        .then((result) => {
          const fileUrl = url.split("?")[0];
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    reader.readAsBinaryString(selectedFile);
  };

  let animating = false;
  const onExiting = () => {
    animating = true;
  };

  const onExited = () => {
    animating = false;
  };

  const changeIndex = (newIndex) => {
    setActiveIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? carouselImages.length - 1 : activeIndex - 1;
    changeIndex(nextIndex);
  };

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === carouselImages.length - 1 ? 0 : activeIndex + 1;
    changeIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    changeIndex(newIndex);
  };

  const onChange = (e, image) => {
    var arr = [];
    for (var i in carouselImages) {
      if (carouselImages[i].url === image.url) {
        carouselImages[i].primaryImage = e.target.checked;
        handleThumnail(carouselImages[i].url);
        arr.push(carouselImages[i]);
      } else {
        carouselImages[i].primaryImage = false;
        arr.push(carouselImages[i]);
      }
    }
    setCarouselImages(arr);
  };

  const slides = carouselImages.map((i, key) => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={i.url}>
        {i?.tags && i?.tags.length > 0 && i?.tags[0] === "inlay" ? null : (
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              Image No {key + 1}
            </label>
            <div className="col-sm-8">
              <div className="pretty p-default p-curve p-toggle">
                <input
                  type="checkbox"
                  checked={i.primaryImage}
                  disabled={!useCatalogPermission}
                  onChange={(e) => {
                    onChange(e, i);
                  }}
                />
                <div className="state p-success p-on">
                  <label>Primary</label>
                </div>
                <div className="state p-danger p-off">
                  <label>Non-Primary</label>
                </div>
              </div>
            </div>
          </div>
        )}
        <img className="d-block w-100" src={i.url} alt={`Slideshow ${i.url}`} />
      </CarouselItem>
    );
  });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={carouselImages}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />

      {slides}
      {carouselImages.length > 1 && (
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
      )}
      {carouselImages.length > 1 && (
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      )}
    </Carousel>
  );
};

export default ImagesCarousel;
