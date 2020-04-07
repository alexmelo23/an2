import React from 'react'
import { Layout, Modal, Avatar } from 'antd'
import Icon from "../../../common/Icon"
import "./Header.css";
import {
  Link
} from 'react-router-dom';

import { BrowserRouter } from 'react-router-dom'

const { Header } = Layout




const CustomisedHeader: React.FC = (props) => {

  console.log("props", props);

  const handleMenuItemOnClick = (item: any): void => {
    switch (item.key) {
      case 'logout': {
        const handleAppLogOut = async () => {
          // await this.props.signUserOut();
          // window.location = '/#signin';
          console.log("window.location")
        }
        Modal.confirm({
          title: 'Logout',
          content: 'Are you sure you want to log out?',
          onOk() {
            handleAppLogOut()
          },
          onCancel() {
            // console.log('Cancel')
          },
        })
        break
      }
      default:
    }
  }

  console.log("Header render");
  return (
    <Header className='admin-header' style={{ background: '#fff', padding: 0 }}>
      <div className='logo'>
        <i className="fas fa-project-diagram"></i>
      </div>
      <div onClick={() => handleMenuItemOnClick({ key: "logout" })} className="user-d">
        <Avatar >USER</Avatar>
      </div>


      <ul id="dashboardTopNav">
        <li>
          <Link to="/dashboard">
            <Icon name='object-ungroup' />
            <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li>
          <Link to="/users">
            <Icon name='user' />
          </Link>
        </li>
        <li>
          <Link to="/file-manager">
            <i className="fas fa-photo-video"></i>
          </Link>
        </li>


      </ul>

    </Header >

  )

}




export default CustomisedHeader
