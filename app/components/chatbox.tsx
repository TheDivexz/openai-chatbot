"use client"

import { Button, Col, Flex, Form, Input, Row } from "antd"
import ChatBubble from "./chatbubble"
import { useState } from "react"
import React from "react"

const Chatbox = () => {
    const [textArray,setTextArray] = useState<string[]>([])
    const [whoSent, setWhoSent] = useState<boolean[]>([])
    const [text,setText] = useState('')

    const handleSubmit = () => {
        if (text === '') {
            return
        }
        setTextArray([...textArray,text])
        setWhoSent([...whoSent,true])
        setText('')
    }

    return(
        <>
        <Flex vertical>
            {/* Display all the chat bubbles */}
            {textArray.map((value,index) => <ChatBubble key={index} text={value} sender={whoSent[index]}/>)}
            {/* Get User Input */}
            <Form layout="horizontal" onFinish={handleSubmit}>
                <Form.Item>
                    <Row>
                        <Col flex='auto'></Col>
                        <Col flex="auto">
                            <Input size='large' value={text} onChange={(event) => setText(event.target.value)}></Input>
                        </Col>
                        <Col flex="auto">
                            <Button size='large' type="primary" htmlType="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Flex>
        </>
    )
}

export default Chatbox