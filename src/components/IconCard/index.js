import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from './styles'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.up('sm')]: desktopStyles,
  [theme.breakpoints.between('xs', 'sm')]: TabStyles,
  [theme.breakpoints.down('xs')]: mobileStyles
}))

const IconCard = ({data}) => {

  const classes = useStyles()

  return (
    <Link href={data.slug}>
      <Card className={` ${classes.card} ${data.title.substring(0,3)}`}>
        <CardContent className={classes.cardBody}>
          <img src={data.image.url} alt="" className={classes.image} />
          <Typography variant="h6" className={classes.title}>
            {data.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default IconCard
