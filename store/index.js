/* eslint-disable no-undef */
import Vue from 'vue'
import Cursor from '../modules/cursor'
import { gsap, TimelineLite, Power3 } from 'gsap/all'
export const state = () => ({
    NewProjectIsWhite: true,
    isOpen: true,
    dark: true,
    user: '',
    loggedIn: false,
    snackbar: false,
    message: '',
    error: null,
    messages: [],
    loader: true,
    animate: false,
    cursor: '',
    pageName: '',
    pageChange: '',
    windowWith: '',
    isPhone: false,
    isComputer: false,
    isTablet: false
})
export const getters = {
    cursor: (state) => state.cursor,
    NewProjectIsWhite: (state) => state.NewProjectIsWhite,
    animate: (state) => state.animate,
    loader: (state) => state.loader,
    snackbar: (state) => state.snackbar,
    isOpen: (state) => state.isOpen,
    dark: (state) => state.dark,
    user: (state) => state.user,
    loggedIn: (state) => !!state.user,
    message: (state) => state.message,
    error: (state) => state.error,
    messages: (state) => state.messages,
    pageName: (state) => state.pageName,
    pageChange: (state) => state.pageChange,
    windowWith: (state) => state.windowWith,
    isPhone: (state) => state.isPhone,
    isComputer: (state) => state.isComputer,
    isTablet: (state) => state.isTablet
}
export const mutations = {
    getWindowWidth(state) {
        state.windowWith = document.body.clientWidth
        if (state.windowWith <= 500) {
            state.isPhone = true
            state.isComputer = false
            state.isTablet = false
        } else if (500 < state.windowWith <= 1024) {
            state.isPhone = false
            state.isComputer = false
            state.isTablet = true
        } else {
            state.isPhone = false
            state.isComputer = true
            state.isTablet = false
        }
    },
    createCursor(state) {
        state.cursor = new Cursor(document.querySelector('.cursor'))
        ;[...document.querySelectorAll('a')].forEach((el) => {
            el.addEventListener('mouseenter', () => state.cursor.emit('enter'))
            el.addEventListener('mouseleave', () => state.cursor.emit('leave'))
        })
    },
    imageEnter(state) {
        state.cursor.emit('reduce')
    },
    imageLeave(state) {
        state.cursor.emit('increase')
    },
    IsWhite(state) {
        state.NewProjectIsWhite = true
    },
    IsNotWhite(state) {
        state.NewProjectIsWhite = false
    },
    isAnimate(state) {
        state.animate = true
    },
    animateIsEnd(state) {
        state.animate = false
    },
    newNotification(state) {
        state.messages.push({ info: state.message, error: state.error })
        setTimeout(() => {
            state.messages.shift()
        }, 2000)
        state.message = ''
        state.error = null
    },
    changePageName(state) {
        state.pageChange = Math.random()
    },
    setPageName(state, path) {
        const yo = path

        let output = yo.replace(/'/g, '-')
        if (output === '/') {
            output = '/index'
        }
        state.pageName = `https://adeline-site-web.s3.eu-west-3.amazonaws.com/page${output}.jpg`
    },
    toggleMenu(state) {
        state.isOpen = !state.isOpen
        if (state.isOpen === true) {
            gsap.fromTo(
                '.hamburger_top',
                0.5,
                { rotate: 0, y: 0, width: '40px', ease: Power3.easeOut },
                { rotate: 45, y: 10, width: '15px', ease: Power3.easeOut }
            )
            gsap.fromTo(
                '.hamburger_bottom',
                0.5,
                { rotate: 0, y: 0, width: '40px', ease: Power3.easeOut },
                { rotate: -45, y: -10, width: '15px', ease: Power3.easeOut }
            )
        } else {
            gsap.fromTo(
                '.hamburger_top',
                0.5,
                { rotate: 45, y: 10, width: '15px', ease: Power3.easeOut },
                { rotate: 0, y: 0, width: '40px', ease: Power3.easeOut }
            )
            gsap.fromTo(
                '.hamburger_bottom',
                0.5,
                { rotate: -45, y: -10, width: '15px', ease: Power3.easeOut },
                { rotate: 0, y: 0, width: '40px', ease: Power3.easeOut }
            )
        }
    },
    setUserData(state, data) {
        state.user = data.user
        this.$axios.setHeader('Authorization', `Bearer ${data.token}`)
        state.loggedIn = true
    },
    darkToLight(state) {
        if (state.dark === false) {
            Vue.prototype.$nuxt.$vuetify.theme.dark = true
            Vue.prototype.$nuxt.$vuetify.theme.light = false
            state.dark = true
        } else if (state.dark === true) {
            Vue.prototype.$nuxt.$vuetify.theme.dark = false
            Vue.prototype.$nuxt.$vuetify.theme.light = true
            state.dark = false
        }
    },
    LoaderToggle(state) {
        if (state.loader === true) {
            const timelinePromise = function() {
                return new Promise(function(resolve) {
                    for (let index = 1; index < 30; index++) {
                        const tl = gsap.timeline()
                        tl.staggerFromTo(
                            `.cls-${index}`,
                            1.2,
                            {
                                y: -200,
                                opacity: 0
                            },
                            {
                                y: 0,
                                opacity: 1,
                                ease: 'sine.Out'
                            },
                            0.03
                        )
                    }
                    const titre = document.querySelectorAll('.titre_preload')
                    const tl1 = new TimelineLite({
                        onComplete: function() {
                            resolve(true)
                        }
                    })

                    tl1.staggerFromTo(
                        titre,
                        1.2,
                        {
                            opacity: 0,
                            y: -200
                        },
                        {
                            opacity: 1,
                            y: 0,
                            ease: 'sine.Out'
                        },
                        0.04
                    )
                })
            }
            timelinePromise().then(function() {
                state.loader = false
            })
        }
    }
}
export const actions = {}
export const strict = false
