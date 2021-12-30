import './sidebar.css'
import {Chat, RssFeed, Videocam, Group, Bookmark, HelpOutline, WorkOutline, LocalLibrary, Event} from '@material-ui/icons'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
            <ul className="sidebarItemLists">
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <RssFeed />
                    </span>
                    <span className="sidebarItemName">Feed</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <Chat />
                    </span>
                    <span className="sidebarItemName">Chat</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <Videocam />
                    </span>
                    <span className="sidebarItemName">Video</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <Group />
                    </span>
                    <span className="sidebarItemName">Group</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <Bookmark />
                    </span>
                    <span className="sidebarItemName">Bookmarks</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <HelpOutline />
                    </span>
                    <span className="sidebarItemName">Questions</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <WorkOutline />
                    </span>
                    <span className="sidebarItemName">Jobs</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <Event />
                    </span>
                    <span className="sidebarItemName">Events</span>
                </li>
                <li className="sidebarItemList">
                    <span className="sidebarItemIcon">
                        <LocalLibrary />
                    </span>
                    <span className="sidebarItemName">Courses</span>
                </li>
                <li className="sidebarItemList">
                   
                    <span className="sidebarItemName"><button className='sidebarMore'>Show More</button></span>
                </li>
            </ul>
            <hr className="sidebarHr" />
            <ul className="sidebarFriends">
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
                <li className="sidebarFriend">
                    <img src="/images/promise.jpg" alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">Promise</span>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default Sidebar
