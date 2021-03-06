import expect from 'expect'
import React from 'react'
import {renderToStaticMarkup as render} from 'react-dom/server'

import AppSidebarHeader from './SidebarHeader'

describe('AppSidebarHeader', () => {
  it('renders div with class="sidebar-header"', () => {
    expect(render(<AppSidebarHeader>test</AppSidebarHeader>))
    .toContain('<div class="sidebar-header">test</div>')
  })
  it('renders no div with class="sidebar-header"', () => {
    expect(render(<AppSidebarHeader></AppSidebarHeader>))
    .not.toContain('<div class="sidebar-header"></div>')
  })
})
