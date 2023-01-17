import Swiper from 'react-id-swiper';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

function ContentSlider ({ images }) {

    const params = {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    }
    return  images === null ? <></> : (
        <div className="project-content__block project-content__block--swiper" style={{width:'80vw'}}>
            <Swiper
                {...params}
                className="swiper"
            >
            {images.map((img, i) => {
                const ratio =
                img.width / img.height >= 1
                    ? 'landscape' : 'portrait'

                return (
                <div className="swiper__slide" key={img.date} >
                    <figure
                        className={ratio}
                        role="navigation"
                    >
                    <img src={img.url} alt='wow' />
                    {(img.title || img.caption) && (
                        <figcaption>
                        {img.title && (
                            <>
                            <span dangerouslySetInnerHTML={{ __html: img.title }}/>
                            {' '}–{' '}
                            </>
                        )}
                        {img.caption && (
                            <span dangerouslySetInnerHTML={{ __html: img.caption }}/>
                        )}
                        </figcaption>
                    )}
                    </figure>
                </div>
                )
            })}
            </Swiper>
        </div>
    )
}
export default ContentSlider