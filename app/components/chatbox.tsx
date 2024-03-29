"use client"

import { Button, Col, Flex, Form, Input, Row, Spin } from "antd"
import ChatBubble from "./chatbubble"
import { useState } from "react"
import React from "react"
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"
import '../styles/chat_box.css'

const Chatbox = () => {

    // IN this instance dangerouslyAllowBrowser is acceptable since we are storing the API key in an environment variable
    // so the value is only visable server side and is inaccessable to the client
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
        // TODO
        // Here is where the OpenAI API should be called and the response retreived
        try {
            let chatHistory = textArray.map((value,index) => {
                return {
                    role: whoSent[index] ? "user" : "assistant",
                    content: value
                }
            })
            chatHistory = [{role: "system",content: "You are a helpful assistant."},...chatHistory,{role: "user",content: currentText}]
            const response = openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chatHistory as ChatCompletionMessageParam[]
            })
            setTextArray([...textArray, currentText, (await response).choices[0].message.content ?? ''])
            setWhoSent([...whoSent,true, false])
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    return(
        <>
        <Flex vertical>
            {/* Display all the chat bubbles */}
            <div className="max-height">
                {textArray.map((value,index) => <ChatBubble key={index} text={value} sender={whoSent[index]}/>)}
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

export default Chatbox