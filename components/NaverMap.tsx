import { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapElement = useRef(null);
  const { naver } = window;

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(37.5556459, 126.920293);

    const map = new naver.maps.Map(mapElement.current, {
      center: location,
      zoomControl: true,
      zoom: 15,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5556459, 126.920293),
      map: map,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // style={{ width: '300px', height: '200px' }}
  return <div className='w-full h-40 sm:w-full sm:h-64 opacity-90' ref={mapElement} id='map'></div>;
};

export default NaverMap;
