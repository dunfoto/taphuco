import 'react-awesome-slider/dist/styles.css'
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css'
import "style/hotSpots.scss"
import React, { useState, useEffect } from "react"
import { Container, Carousel } from 'react-bootstrap'
import Popover from "components/Popover"
import Link from "next/link"
import axios from "axios"
import { connect } from 'react-redux'
import { GET_CONFIG } from "redux/reducers/config"

const Home = React.memo(props => {
    const { banners, categories, config, dispatch } = props,
        [show, setShow] = useState([]),
        [selected, setSeleted] = useState(0),
        [lengthImage, setLengthImage] = useState(0)

    useEffect(() => {
        setLengthImage(banners.length - 1)
    }, [banners])

    useEffect(() => {
        dispatch({
            type: GET_CONFIG,
            config
        })
    }, [config])

    useEffect(() => {
        if (Boolean(banners.length)) {
            const nodes = banners[selected].nodes?.filter(node => node.openDefault)
            setShow(nodes.map(node => node._id))
        }
    }, [selected])

    const clickHotSpot = async id => {
        if (show.includes(id)) {
            return setShow(show.filter(t => t !== id))
        } else {
            return setShow([...show, id])
        }
    }


    const closePopover = id => {
        setShow(show.filter(t => t !== id))
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
                prevIcon={<i onClick={previousButton} className="fas fa-chevron-left fa-3x"></i>}
                nextIcon={<i onClick={nextButton} className="fas fa-chevron-right fa-3x"></i>}
                indicators={false}
                fade={true}
                pause="hover"
                slide={false}
                style={{ position: 'relative' }}
                interval={9000}
            >
                {banners.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img src={item.img} style={{ position: "relative", width: "100%", objectFit: "cover" }} />
                        {item.nodes && item.nodes.map((node, i) => (
                            <Popover
                                key={i}
                                _id={node._id}
                                bottom={node.bottom}
                                left={node.left}
                                openDefault={node.openDefault}
                                closePopover={closePopover}
                                showSelected={show.includes(node._id)}
                                onSelect={clickHotSpot}
                                popup={
                                    <div className="card p-0 text-left w-10 hotspot-homepage" style={{ zIndex: 9000 }}>
                                        <div className="card-body m-0 p-0" style={{ width: 301 }}>
                                            <div className="card-title w-100 title p-2 px-4 rounded-top">
                                                <div className="w-100 text-right">
                                                    <button onClick={() => closePopover(node._id)} className="btn p-0 m-0 text-white">&times;</button>
                                                </div>
                                                <h5>{node.content.title}</h5>
                                                <p className="text-white">{node.content.subTitle}</p>
                                            </div>
                                            <div className="content w-100 p-2 px-4" style={{ width: 301 }}>
                                                <p className="title">Màu sắc</p>
                                                <p className="sub-content">{node.content.color}</p>
                                                <p className="title">Yêu cầu</p>
                                                <p className="sub-content">{node.content.requirement}</p>
                                                <p className="title">Dòng Sản Phẩm</p>
                                                <p className="sub-content">{node.content.product}</p>
                                                <a href={node.content.link} className="btn border rounded-pill px-4">Xem thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </Carousel.Item>
                ))}
            </Carousel>
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
                    {categories.map(category => (
                        <div key={category._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 my-4">
                            <div className="card card__category">
                                <div className="container__img container__home ">
                                    <img src={category.img} alt={category._id} className="image" />
                                    <Link href="/ung-dung/cotton">
                                        <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                            <h4 className="textimage">{category.title}</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
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
                        <div className="card bg-transparent">
                            <img src="/sanxuatondinh.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Sản xuất ổn định</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
                            <img src="/hieuquasanxuattang.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hiệu quả sản xuất tăng</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
                            <img src="/hoachatdungtudau.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất đúng từ đầu</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
                            <img src="/hoachatcodobenmaucao.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất có độ bền màu cao</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
                            <img src="/hoachatdatchuan.png" className="card-img-top" />
                            <div className="card-body p-0 pb-3 pt-3">
                                <p className="card-text text-giai-phap">Hoá chất đạt OEKOTEX, BLUESIGN, REACH, …</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
                            <img src="/giaonhandungtiendo.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Dịch vụ giao nhận đúng tiến độ</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
                            <img src="/hoachatchonhieuloaquytrinh.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất cho nhiều loại quy trình</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 my-4 py-2">
                        <div className="card bg-transparent">
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

Home.getInitialProps = async (ctx) => {
    const banners = (await axios.get(`${process.env.API}/banners`)).data.data
    const categories = (await axios.get(`${process.env.API}/categories`)).data.data
    const config = (await axios.get(`${process.env.API}/config`)).data.data
    return { banners, categories, config }
}

export default connect()(Home)