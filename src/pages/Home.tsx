// import { Menu } from "antd";
import { Eyelash } from "Icons"
import { MobileButton } from "components/Button"
import { Layout, StyledHeader, Content } from "components/Header"
import {Logo} from 'components/Logo'
import Marquee from "components/Marquee"
import { Menu, TopFrame, TopFrameBlock, TopFrameContainer, TopFrameLabel } from "components/Nav"
import React, { useEffect, useRef, useState } from "react"
import ProductVideo from "./ProductVideo"
import ProductIntro from "./ProductIntro"
import ProductDetails from "./ProductDetails"
import BannerAdvertisement from "./BannerAdvertisement"
import FAQ from "./FAQ"
import ContactUs from "components/ContactUs"
import Reviews from "./Reviews"
import Testimonies from "./Testimonials"
import Footer from "components/Footer"
import Contact from "components/Contact"
import { Modal } from "antd"
import ConfirmModal from "components/ConfirmDialog"
import ReactGA from 'react-ga';


export default function Home<T extends React.PropsWithChildren<{}>>(props: T){

    const [alertModal, contextHolder] = Modal.useModal();

    const frameLabels = ['100% Light Blocking','100% Silk','No Straps','No Fuss','Rest Easy',];

    const [ contactUsOpen, setContactUsOpen ] = useState(false)
    const [ confirmOpen, setConfirmOpen ] = useState(false)

    const scrollToView = (elementId: string, label: string) => {
        ReactGA.event({
            category: 'Top-Navigation',
            action: 'Button_Click',
            label
        });
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
    }

    const menuItems = [
        {
            key: 1,
            label: 'Product',
            onClick: (ev: any) => scrollToView('product-description', 'Product')
        },
        {
            key: 2,
            label: 'Did you know?',
            onClick: (ev: any) => scrollToView('did-you-know', 'Did you know?')
        },
        {
            key: 3,
            label: 'Benefits',
            onClick: (ev: any) => scrollToView('product-container', 'Benefits')
        },
        {
            key: 4,
            label: 'Comparison',
            onClick: (ev: any) => scrollToView('comparison', 'Comparison')
        },
        {
            key: 5,
            label: 'FAQs',
            onClick: (ev: any) => scrollToView('faq', 'FAQs')
        },
        {
            key: 6,
            label: 'Reviews',
            onClick: (ev: any) => scrollToView('review', 'Reviews')
        },                        
    ];

    const slideContainerRef = useRef<HTMLDivElement>(null)

    const closeModal = (openConfirm: boolean, hasAPIError?: boolean) => {
        setContactUsOpen(prev => !prev)
        if(hasAPIError){
            alertModal.error({
                title: <span style={{color: 'red'}}>Error</span>,
                content: (
                    <div style={{color: 'red'}}>
                        An error has occurred while processing your request.
                    </div>
                ),
                okType: "default",
                okButtonProps: {
                    style: {
                        color: 'red !important'
                    }
                }
            })
            return
        }
        if(openConfirm){
            setConfirmOpen(true)
        }       
    }

    const openModal = (section: string, label: string) => {
        setContactUsOpen(true);
        ReactGA.event({
            category: section,
            action: 'Button_Click',
            label
        });
    }
    
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
    
    return (
        <Layout>
            {contextHolder}
            <ConfirmModal open={confirmOpen} close={() => setConfirmOpen(false)} />
            <ContactUs open={contactUsOpen} close={closeModal} />
            <TopFrame>
                <Marquee>
                    <TopFrameContainer> 
                        <TopFrameBlock>
                            <Eyelash />
                        </TopFrameBlock>
                        {
                            frameLabels.map((lbl,index) => (
                                <TopFrameBlock key={index} $borderRight $paddingRight>
                                    <TopFrameLabel>
                                        {lbl}
                                    </TopFrameLabel>
                                </TopFrameBlock>
                            ))
                        }
                    </TopFrameContainer>
                </Marquee>
            </TopFrame>
            <StyledHeader>
                <Logo className="logo-nav-section" />
                <MobileButton items={menuItems} />
                <Menu
                    className="menu"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}                
                    items={menuItems}
                    disabledOverflow={true}
                />
            </StyledHeader>
            <Content>
                <ProductIntro openModal={() => openModal('Product_Intro', 'Try Now')} slideContainerRef={slideContainerRef} />
                <ProductVideo slideContainerRef={slideContainerRef} />
                <ProductDetails openModal={() => openModal('Product_Details', 'Shop Now')} /> 
                <BannerAdvertisement src="img/banner1-large.png" />
                <FAQ openModal={() => openModal('FAQ', 'Shop Now')} />
                <Reviews />
                <Testimonies openModal={() => openModal('Testimonies', 'Shop Now')} />
                <Contact />
                <Footer openModal={() => openModal('Footer', 'Shop Now')} />
            </Content>
        </Layout>
    )
}