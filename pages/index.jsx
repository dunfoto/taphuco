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
import { getStringInHtml } from "common/html"

const Home = React.memo(props => {
    const { banners, categories, config, dispatch, solutions, references } = props,
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
                    <img className="img-thumbnail" src={config?.homepage?.img ? config?.homepage?.img : '/thongdiep.png'} width="571" height="757" />
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
                    <div className="overlay" style={{ left: "73%", top: "27%", width: 150 }}>
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
                                    <Link href={`/ung-dung/${encodeURI(category.title)}`}>
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
                            {references.map(ref => (
                                <Carousel.Item key={ref._id}>
                                    <p className="text-color">{getStringInHtml(ref.content).slice(0, 300)}</p>
                                    <Link href={`/trai-nghiem-khach-hang/${encodeURI(ref.title)}`}>
                                        <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 my-4 btn-border text-color">Xem thêm</button>
                                    </Link>
                                </Carousel.Item>
                            ))}
                            {/* <Carousel.Item>
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
                            </Carousel.Item> */}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="container text-center container__giai-phap">
                <h2 className="textthongdiep">Giải pháp</h2>
                <div className="row">
                    {solutions.map(solution => (
                        <div key={solution._id} className="col-md-3 col-sm-4 col-xs-12 my-4 py-2" style={{ cursor: "pointer" }}>
                            <Link href={`/giai-phap/${encodeURI(solution.title)}`}>
                                <div className="card bg-transparent">
                                    <img src={solution.img} className="card-img-top" />
                                    <div className="card-body pb-3 pt-3 text-center">
                                        <p className="card-text text-giai-phap text-giai-phap-new">{solution.showTitle}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

Home.getInitialProps = async (ctx) => {
    try {
        const banners = (await axios.get(`${process.env.API}/banners/all`)).data.data,
            categories = (await axios.get(`${process.env.API}/categories/all`)).data.data,
            config = (await axios.get(`${process.env.API}/config`)).data.data,
            solutions = (await axios.get(`${process.env.API}/solutions/all`)).data.data,
            references = (await axios.get(`${process.env.API}/customer-experiences/reference`)).data.data

        return { banners, categories, config, solutions, references }
    } catch (err) {
        return { banners: [], categories: [], solutions: [], references: [] }
    }
}

export default connect()(Home)