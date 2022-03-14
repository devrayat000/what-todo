import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

const CheckedIcon: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon fill='url(#gradient-horizontal)' {...props}>
      <linearGradient id='gradient-horizontal' x1={0} y1={0} x2={1} y2={1}>
        <stop offset='0%' stopColor='hsl(192, 100%, 67%)' />
        <stop offset='100%' stopColor='hsl(280, 87%, 65%)' />
      </linearGradient>
      <path
        fill='url(#gradient-horizontal)'
        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      />
    </SvgIcon>
  )
}

export default CheckedIcon
