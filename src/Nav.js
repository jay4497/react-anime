import React from 'react'
import Link from '@material-ui/core/Link'

class Nav extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center', lineHeight: "45px", marginBottom: "10px"}}>
                <Link href="/">
                    Home
                </Link>
            </div>
        )
    }
}

export default Nav
