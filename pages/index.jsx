import 'react-awesome-slider/dist/styles.css'
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css'
import "style/hotSpots.scss"
import React, { useState, useEffect } from "react"
import { Container, Carousel } from 'react-bootstrap'
import AwesomeSlider from 'react-awesome-slider'
import Popover from "components/Popover"
import Link from "next/link"
import axios from "utils/axios"

const images = [
    {
        original: '/assets/img/banner-2.png',
        nodes: [
            {
                _id: "123123123123123",
                left: 20,
                bottom: 20,
                openDefault: true
            },
            {
                _id: "asdfagbjidashvlasd",
                left: 60,
                bottom: 60,
                openDefault: false
            }
        ]
    },
    {
        original: '/assets/img/banner-3.png',
        nodes: [
            {
                _id: "1231231231231dfs23",
                left: 50,
                bottom: 50,
                openDefault: true
            }
        ]
    },
    {
        original: '/assets/img/banner-4.png',
    },
]

const Home = React.memo(props => {
    const [config, setConfig] = useState(null),
        [show, setShow] = useState(null),
        [selected, setSeleted] = useState(0),
        [lengthImage, setLengthImage] = useState(0)

    useEffect(() => {
        loadConfig()
    }, [])

    useEffect(() => {
        setLengthImage(images.length - 1)
    }, [images])

    useEffect(() => {
        setShow(images[selected].nodes?.find(node => node.openDefault)?._id)
    }, [selected])

    const loadConfig = async () => {
        try {
            const res = await axios.get("/config")
            setConfig(res.data.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }


    const clickHotSpot = id => {
        if (show === id) {
            return setShow(null)
        } else {
            return setShow(id)
        }
    }

    const previousButton = e => {
        if (selected <= 0) {
            setSeleted(0)
        } else {
            setSeleted(selected - 1)
        }
    }

    const nextButton = e => {
        if (selected >= lengthImage) {
            setSeleted(0)
        } else {
            setSeleted(selected + 1)
        }
    }

    const handleSelect = (selectedIndex, e) => {
        setSeleted(selectedIndex);
    }

    return (
        <div>
            <Carousel
                activeIndex={selected}
                onSelect={handleSelect}
                prevIcon={<i onClick={previousButton} className="fas fa-chevron-left"></i>}
                nextIcon={<i onClick={nextButton} className="fas fa-chevron-right"></i>}
                indicators={false}
                fade={true}
                pause="hover"
                slide={false}
                style={{ position: 'relative' }}
                interval={9000}
            >
                {images.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img src={item.original} style={{ position: "relative", width: "100%", objectFit: "cover" }} />
                        {item.nodes && item.nodes.map((node, i) => (
                            <Popover
                                key={i}
                                _id={node._id}
                                bottom={node.bottom}
                                left={node.left}
                                showSelected={show}
                                onSelect={_id => {
                                    clickHotSpot(_id)
                                }}
                                popup={
                                    <div className="card p-0 text-left w-75 ml-auto hotspot-homepage" style={{ zIndex: 9000 }}>
                                        <div className="card-body m-0 p-0">
                                            <div className="card-title title p-2 px-4 rounded-top">
                                                <div className="w-100 text-right">
                                                    <button onClick={() => setShow(null)} className="btn p-0 m-0 text-white">&times;</button>
                                                </div>
                                                <h5>Cotton</h5>
                                                <p className="text-white">dùng bộ sản phẩm hoá chất cho ra:</p>
                                            </div>
                                            <div className="content p-2 px-4">
                                                <p className="title">Màu sắc</p>
                                                <p className="sub-content">Tươi sáng trên nền vải thoáng mát.</p>
                                                <p className="title">Yêu cầu</p>
                                                <p className="sub-content">Độ bền giặt cao.</p>
                                                <p className="title">Dòng Sản Phẩm</p>
                                                <p className="sub-content">Thuốc nhuộm: Covazol - LC &   HCCB và chất trợ đi kèm.</p>
                                                <a href="#" className="btn border rounded-pill px-4">Xem thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </Carousel.Item>
                ))}
            </Carousel>
            {/* <AwesomeSlider
                animation="scaleOutAnimation"
                selected={selected}
                mobileTouch={true}
                cancelOnInteraction={false}
                organicArrows={false}
                bullets={false}
                buttonContentLeft={<i onClick={previousButton} className="fas fa-chevron-left"></i>}
                buttonContentRight={<i onClick={nextButton} className="fas fa-chevron-right"></i>}
            >
                {images.map((item, index) => (
                    <div data-src={item.original} key={index}>
                        {item.nodes && item.nodes.map((node, i) => (
                            <Popover
                                key={i}
                                _id={node._id}
                                bottom={node.bottom}
                                left={node.left}
                                showSelected={show}
                                onSelect={_id => {
                                    clickHotSpot(_id)
                                }}
                                popup={
                                    <div className="card p-0 text-left w-75 ml-auto hotspot-homepage" style={{ zIndex: 9000 }}>
                                        <div className="card-body m-0 p-0">
                                            <div className="card-title title p-2 px-4 rounded-top">
                                                <div className="w-100 text-right">
                                                    <button onClick={() => setShow(null)} className="btn p-0 m-0 text-white">&times;</button>
                                                </div>
                                                <h5>Cotton</h5>
                                                <p className="text-white">dùng bộ sản phẩm hoá chất cho ra:</p>
                                            </div>
                                            <div className="content p-2 px-4">
                                                <p className="title">Màu sắc</p>
                                                <p className="sub-content">Tươi sáng trên nền vải thoáng mát.</p>
                                                <p className="title">Yêu cầu</p>
                                                <p className="sub-content">Độ bền giặt cao.</p>
                                                <p className="title">Dòng Sản Phẩm</p>
                                                <p className="sub-content">Thuốc nhuộm: Covazol - LC &   HCCB và chất trợ đi kèm.</p>
                                                <a href="#" className="btn border rounded-pill px-4">Xem thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                ))}
            </AwesomeSlider> */}
            <div className="thongdiep">
                <div className="text-center">
                    <img className="img-thumbnail" src="/thongdiep.png" width="571" height="757" />
                    <div className="position-absolute noidungthongdiep text-left" style={{ boxShadow: "0px 4px 64px rgba(0, 0, 0, 0.25)" }}>
                        <div className="mr-auto ml-auto w-auto">
                            <h2 className="textthongdiep">{config?.homepage?.pointMessage}</h2>
                            <ul>
                                {config?.homepage?.contentMessage.map((item, index) => (
                                    <li key={index} className="my-2 text-color" style={{ fontSize: 18 }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="overlay" style={{ left: "75%", top: "30%", width: 150 }}>
                        <img src="/accessory_image_footer.svg" />
                        <img src="/accessory_image_footer.svg" />
                        <img src="/accessory_image_footer.svg" />
                    </div>
                </div>
            </div>
            <Container className="container text-center container__ung-dung">
                <h2 className="textthongdiep">Ứng dụng</h2>
                <div className="row">
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/cotton.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/cotton">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Cotton</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/poly.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/poly">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Poly</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/bikini.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/bikini">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải đồ tắm, thể thao</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/vaiinhoa.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/vaiinhoa">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải In Hoa</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/jean.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/jean">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Jeans</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/baby.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/baby">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải an toàn cho baby</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/vaitrang.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/vaitrang">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải trắng</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img container__home">
                                <img src="/khac.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/khac">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải khác</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="container__trainghiemkhachhang text-center">
                <div className="content row mr-auto ml-auto" style={{ backgroundColor: "transparent", backgroundImage: `url(/trainghiemkhachhang-border.png)`, backgroundSize: "100% 100%" }}>
                    <h2 className="textthongdiep col-12 ">Trải nghiệm khách hàng</h2>
                    <div className="col-12">
                        <Carousel
                            controls={false}
                            interval={3000}
                            pause="hover"
                            slide={false}
                            style={{ position: 'relative' }}
                        >
                            <Carousel.Item>
                                <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <small className="text-color">John Doe, Product Manager of ABC company</small>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <small className="text-color">John Doe, Product Manager of ABC company</small>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <small className="text-color">John Doe, Product Manager of ABC company</small>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="container text-center container__giai-phap">
                <h2 className="textthongdiep">Giải pháp</h2>
                <div className="row">
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/sanxuatondinh.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Sản xuất ổn định</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/hieuquasanxuattang.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hiệu quả sản xuất tăng</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/hoachatdungtudau.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất đúng từ đầu</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/hoachatcodobenmaucao.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất có độ bền màu cao</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/hoachatdatchuan.png" className="card-img-top" />
                            <div className="card-body p-0 pb-3 pt-3">
                                <p className="card-text text-giai-phap">Hoá chất đạt OEKOTEX, BLUESIGN, REACH, …</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/giaonhandungtiendo.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Dịch vụ giao nhận đúng tiến độ</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/hoachatchonhieuloaquytrinh.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất cho nhiều loại quy trình</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card">
                            <img src="/hoachatchoxuongmoi.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất cho xưởng mới</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Home