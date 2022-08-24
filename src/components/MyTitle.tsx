


import React, { FC } from 'react'
import {Button, Typography,Row, Col } from "antd"
const {Title} = Typography
const MyTitle:FC<{title?:string,level?:any}> = ({
    title,
    level=3
}) => {
    return (
        <Row>
            <Col>
                <Title style={{color:"#f50",fontSize:20}} level={level} > {title}</Title>
            </Col>
        </Row>
    )
}

export default MyTitle