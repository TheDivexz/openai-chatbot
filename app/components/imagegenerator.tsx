"use client"

import { Button, Col, Flex, Form, Input, Row, Spin } from "antd"
import ChatBubble from "./chatbubble"
import { useState } from "react"
import React from "react"
import OpenAI from "openai";
import '../styles/chat_box.css'

const ImageGenerator = () => {

    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

    const [textArray,setTextArray] = useState<string[]>([])
    const [whoSent, setWhoSent] = useState<boolean[]>([])
    const [text,setText] = useState('')
    const [loading,setLoading] =useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        const currentText = text
        setText('')
        if (currentText === '') {
            return
        }
        // Here is where the OpenAI API should be called and the response retreived
        try {
            const response = await openai.images.generate({ 
                model: "dall-e-3", 
                prompt: currentText 
            });
            setTextArray([...textArray, currentText, response.data[0].url ?? ''])
            setWhoSent([...whoSent,true, false])
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    return (
        <>
        <Flex vertical>
            {/* Display all the chat bubbles */}
            <div className="max-height">
                {textArray.map((value,index) => <ChatBubble key={index} text={value} sender={whoSent[index]} isImage/>)}
            </div>
            {/* Get User Input */}
            <div className="pinned-bottom">
                <Spin spinning={loading}>
                    <Form layout="horizontal" onFinish={handleSubmit}>
                        <Form.Item>
                            {/* Centers the text field and makes it bigger while keeping it inline */}
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
                </Spin>
            </div>
        </Flex>
        </>
    )
}

export default ImageGenerator;