import { Checkbox, Flex } from '@mantine/core'

import "./Info.css"
import { useEffect, useState } from 'react'
import { BirthDatePicker } from './BirthDatePicker'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Info = () => {
  const { isAuth, data, refetch } = useAuth()

  useEffect(() => {
    if(isAuth) {
      refetch()
    }
  }, [isAuth, refetch])

  const [firstName, setFirstName] = useState<string>(`${data?.firstName}`)
  const [lastName, setLastName] = useState<string>(`${data?.lastName}`)

  const [phone, setPhone] = useState<string>(`${data?.phone}`)
  const [email, setEmail] = useState<string>(`${data?.email}`)

  return (
    <Flex className='info'>
      <Flex className='info__text-box'>
        <label className="text-gray">Фамиля</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </Flex>
      <Flex className='info__text-box'>
        <label className="text-gray">Имя</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </Flex>
      <Flex className='info__text-box'>
        <label className="text-gray">Дата рождения</label>
        <BirthDatePicker date={data?.birthDate}/>
      </Flex>
      <Flex className='info__text-box'>
        <label className="text-gray">Номер телефона <span style={{color:'#E91212'}}>*</span></label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
      </Flex>
      <Flex className='info__text-box'>
        <label className="text-gray">E-mail <span style={{color:'#E91212'}}>*</span></label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Flex>
      <Flex className='text-policy' mt={20}>
        <Checkbox type="checkbox" />
        <span>Я соглашаюсь на обработку персональных данных в соответствии <Link to='#' className='text-green'>с Условиями использования сайта</Link>, <Link to='#' className='text-green'> Политикой обработки персональных данных </Link> и на получнение сообщений в процессе обработки</span>
      </Flex>
      <button className='info-btn'>Сохранить</button>
    </Flex>
  )
}
