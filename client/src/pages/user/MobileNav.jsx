import { Navbar } from 'konsta/react'
import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function MobileNav() {
  return (
    <div>
        <Navbar
          title="Yummers"
          className="bg-orange-600"
          right={
            <Link navbar>
              <FaUserAlt />
              <span></span>
            </Link>
          }
        />
    </div>
  )
}

export default MobileNav