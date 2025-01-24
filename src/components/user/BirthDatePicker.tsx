import { Select, Flex, Image } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import Icon from "../../assets/images/user/arrow.svg";

interface IBirthDatePicker {
  date?: string; 
}

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('ru', { month: 'long' })
);
const years = Array.from(
  { length: 100 },
  (_, i) => (new Date().getFullYear() - i).toString()
);

export const BirthDatePicker: React.FC<IBirthDatePicker> = ({ date }) => {
  const [birthDate, setBirthDate] = useState<string>(date || '');
  
  const [day, setDay] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const icon = <Image src={Icon} w={13} h={13}/>;

  console.log(birthDate);

  useEffect(() => {
    if (date) {
      const [y, m, d] = date.split('-');
      setDay(d);
      setMonth(months[+m - 1]);
      setYear(y);
    }
  }, [date]);

  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${year}-${months.indexOf(month) + 1}-${day}`;
      setBirthDate(formattedDate);
    }
  }, [day, month, year]);

  return (
    <Flex w={375} h={40} align="center" gap="md" className="birth-date-picker">
      <Select
        rightSection={icon}
        data={days}
        value={day}
        onChange={setDay}
        style={{ width: 80 }}
        placeholder="День"
      />
      <Select
        rightSection={icon}
        data={months}
        value={month}
        onChange={setMonth}
        style={{ width: 150 }}
        placeholder="Месяц"
      />
      <Select
        rightSection={icon}
        data={years}
        value={year}
        onChange={setYear}
        style={{ width: 100 }}
        placeholder="Год"
      />
    </Flex>
  );
};
