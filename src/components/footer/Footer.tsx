import { Flex, Image } from "@mantine/core"
import Logo from "../../assets/images/navbar/logo.svg"
import Instagram from "../../assets/images/footer/instagram.svg"
import Viber from "../../assets/images/footer/viber.svg"
import Telegram from "../../assets/images/footer/telegram.svg"
import "./Footer.css"


export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <Flex className="container-sm" bg="#EEF1F2">
        <Flex className="footer" justify='space-between' gap={80}>
          
          <Flex className="footer-left" direction='column' align='center' gap={20}>
            <Image src={Logo}/>
            <span>© 2024 «reypnazarovanazira@gmail.com»</span>
            <Flex className="icons" gap={20}>
              <Image src={Instagram} w={31} h={31}/>
              <Image src={Viber} w={31} h={31}/>
              <Image src={Telegram} w={31} h={31}/>
            </Flex>
          </Flex>

          <Flex className="footer-right" gap={50}>
            <Flex className="foote-text-box" direction='column' gap={20}>
              <span className="footer-text-box-title">О компании</span>
              <span>Партнерская программа</span>
              <span>Реквизиты</span>
              <span>Контакты</span>
            </Flex>

            <Flex className="foote-text-box" direction='column' gap={20}>
              <span className="footer-text-box-title">Магазинам</span>
              <span>Помощь магазинам</span>
              <span>Приглашение к сотрудничеству</span>
              <span>Вход в личный кабинет</span>
            </Flex>

            <Flex className="foote-text-box" direction='column' gap={20}>
              <span className="footer-text-box-title">Правовая информация</span>
              <span>Условия использования сайта</span>
              <span>Политика обработки персональных данных</span>
              <span>Условия заказа и доставки</span>
              <span>Правила сервиса «закажи и забери»</span>
            </Flex>
          </Flex>

        </Flex>
      </Flex>
    </div>
  )
}
