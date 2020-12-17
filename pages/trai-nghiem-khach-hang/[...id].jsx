import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Carousel } from "react-bootstrap"
import "../../style/ung-dung.css"

const DetailUngDungComponent = React.memo(props => {
    const { query: { id } } = useRouter()

    return (
        <React.Fragment>
            <div className="container__ungdung bg-transparent">
                <div className="container">
                    <div className="card-search text-center">
                        <h2 className="textthongdiep">A seamless transition</h2>
                        <br className="my-4 py-4" />
                    </div>
                    <div className="col-sm-12">
                        <img src="/trainghiemkhachhang1.png" className="w-100 my-4" />
                    </div>
                    <div className="col-sm-12 text-left">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Condimentum lacinia quis vel eros. Proin libero nunc consequat interdum varius sit amet. Ut diam quam nulla porttitor massa id neque. Ullamcorper malesuada proin libero nunc consequat. Pellentesque dignissim enim sit amet venenatis urna. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Quam elementum pulvinar etiam non quam. Semper viverra nam libero justo laoreet sit amet cursus sit. Viverra orci sagittis eu volutpat. Purus sit amet volutpat consequat mauris nunc congue nisi vitae. Risus pretium quam vulputate dignissim. Id leo in vitae turpis massa. Sagittis aliquam malesuada bibendum arcu. Massa sed elementum tempus egestas. Eu turpis egestas pretium aenean pharetra magna. Vel pretium lectus quam id.<br />
                        Senectus et netus et malesuada fames. Fermentum iaculis eu non diam phasellus vestibulum lorem. Mattis aliquam faucibus purus in. Nulla posuere sollicitudin aliquam ultrices sagittis orci. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam. Ante metus dictum at tempor. Magna eget est lorem ipsum dolor sit. Vulputate enim nulla aliquet porttitor lacus luctus. In nisl nisi scelerisque eu ultrices. Lectus arcu bibendum at varius. Non odio euismod lacinia at quis risus sed. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Interdum varius sit amet mattis vulputate enim. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ornare aenean euismod elementum nisi. Elementum eu facilisis sed odio morbi quis. Senectus et netus et malesuada fames ac turpis egestas. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Sit amet justo donec enim. Mi in nulla posuere sollicitudin.<br />
                        Ultricies integer quis auctor elit sed vulputate mi sit amet. Ultrices eros in cursus turpis massa tincidunt dui ut. In ornare quam viverra orci sagittis eu volutpat odio. Ultricies tristique nulla aliquet enim tortor at auctor. Id consectetur purus ut faucibus pulvinar elementum integer enim. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Metus vulputate eu scelerisque felis imperdiet. Sagittis orci a scelerisque purus semper. Auctor urna nunc id cursus. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Cum sociis natoque penatibus et magnis dis parturient. Amet consectetur adipiscing elit duis tristique sollicitudin. Sit amet aliquam id diam maecenas. Bibendum est ultricies integer quis auctor elit sed vulputate. Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum. Elit duis tristique sollicitudin nibh. In hac habitasse platea dictumst quisque sagittis purus sit amet. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate.<br />
                        Sed risus pretium quam vulputate dignissim suspendisse in. Id venenatis a condimentum vitae sapien pellentesque. Ornare quam viverra orci sagittis eu volutpat. Sagittis eu volutpat odio facilisis. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Viverra nam libero justo laoreet. Quis commodo odio aenean sed adipiscing diam donec. Imperdiet proin fermentum leo vel orci porta. Consequat nisl vel pretium lectus quam id. Vitae turpis massa sed elementum tempus egestas sed sed risus. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum.<br />
                        Rhoncus urna neque viverra justo nec ultrices dui sapien. Mauris augue neque gravida in fermentum et. Non blandit massa enim nec dui nunc mattis enim. Lacus luctus accumsan tortor posuere ac. Ipsum faucibus vitae aliquet nec ullamcorper sit amet. Ut eu sem integer vitae justo eget magna fermentum. Nulla malesuada pellentesque elit eget gravida cum. Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Erat velit scelerisque in dictum non consectetur. Non diam phasellus vestibulum lorem sed risus ultricies. Tempor orci eu lobortis elementum. Diam vel quam elementum pulvinar etiam.<br />
                    </div>
                </div>
            </div >
            <div className="container__trainghiemkhachhang text-center">
                <div className="content row mr-auto ml-auto" style={{ backgroundColor: "transparent", backgroundImage: `url(/trainghiemkhachhang-border.png)`, backgroundSize: "100% 100%" }}>
                    <h2 className="textthongdiep col-12">Trải nghiệm khách hàng</h2>
                    <div className="col-12">
                        <Carousel
                            indicators={false}
                            controls={false}
                            interval={3000}
                            pause="hover"
                            slide={false}
                            style={{ position: 'relative' }}
                        >
                            <Carousel.Item>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <button className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default DetailUngDungComponent