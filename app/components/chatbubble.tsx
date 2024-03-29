"use client"

import { Avatar, Flex, Space, Image } from "antd"
import '../styles/chat_bubbles.css'
import { UserOutlined } from '@ant-design/icons';


interface ChatBubbleProps {
    text: string
    sender: boolean
    isImage?: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({text,sender,isImage = false}) => {

    return(
    <div>
    {
        sender ? 
            (<>
                <Flex justify="flex-end">
                    <Space>
                        <div className="user bubble">
                            <p>{text}</p>
                        </div>
                        <Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />}/>
                    </Space>
                </Flex>
            </>) 
        : 
        (<>
            <Flex justify="flex-start">
                <Space>
                    <Avatar style={{ backgroundColor: '#87d068' }}>GPT</Avatar>
                    <div className="bot bubble">
                        {
                            isImage ?
                            <Image width={200} src={text}/>
                            :
                            <p>{text}</p>
                        }
                    </div>
                </Space>
            </Flex>
        </>) 
    }
    </div>
    )
}

export default ChatBubble