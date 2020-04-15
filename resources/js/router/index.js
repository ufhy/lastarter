import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from '../store'

Vue.use(VueMeta)
Vue.use(VueRouter)

const globalMiddleware = ['i18n']
const routeMiddleware = resolveMiddleware(
    require.context('../middleware', false, /.*\.js$/)
)

const router = createRouter()
sync(store, router)

export default router


/**
 * Create router instance
 * @return {VueRouter}
 */
function createRouter() {
    const router = new VueRouter({
        scrollBehavior,
        mode: 'history',
        routes
    })

    router.beforeEach(beforeEach)
    router.afterEach(afterEach)
    
    return router
}

/**
 * Scroll behavior
 * @param {VueRouter} to 
 * @param {VueRouter} from 
 * @param {Object|undefined} savedPosition 
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }

    if (to.hash) {
        return { selector: to.hash }
    }

    const [component] = router.getMatchedComponents({ ...to }).slice(-1)
    if (component && component.scrollToTop === false) {
        return {}
    }
    return { x: 0, y: 0 }
}

/**
 * Get middleware
 * @param {Object} meta 
 * @return {Array}
 */
function getMiddleware(meta) {
    const middleware = [...globalMiddleware]
    if (typeof meta.middleware !== 'undefined') {
        if (Array.isArray(meta.middleware)) {
            middleware.push(...meta.middleware)
        }
        else {
            middleware.push(meta.middleware)
        }
    }
    
    return middleware
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
function callMiddleware (middleware, to, from, next) {
    const stack = middleware.reverse()
    const _next = (...args) => {
        // Stop if "_next" was called with an argument or the stack is empty.
        if (args.length > 0 || stack.length === 0) {
            if (args.length > 0) {
                // router.app.$loading.finish()
            }
    
            return next(...args)
        }
    
        const middleware = stack.pop()
    
        if (typeof middleware === 'function') {
            middleware(to, from, _next)
        } else if (routeMiddleware[middleware]) {
            routeMiddleware[middleware](to, from, _next)
        } else {
            throw Error(`Undefined middleware [${middleware}]`)
        }
    }
    
    _next()
}

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Array}
 */
function resolveComponents (components) {
    return Promise.all(components.map(component => {
        return typeof component === 'function' ? component() : component
    }))
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware (requireContext) {
    return requireContext.keys()
        .map(file =>
            [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
        )
        .reduce((guards, [name, guard]) => (
            { ...guards, [name]: guard.default }
        ), {})
}

/**
 * Global router guard
 * @param {VueRouter} to 
 * @param {VueRouter} from 
 * @param {Function} next 
 */
async function beforeEach(to, from, next) {
    let components = []
    try {
        // Get the matched components and resolve them.
        components = await resolveComponents(
            router.getMatchedComponents({ ...to })
        )
        
    } catch (error) {
        if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
            window.location.reload(true)
            return
        }
        
    }
    if (components.length === 0) {
        return next()
    }

    // Start the loading bar.
    if (components[components.length - 1].loading !== false) {
    //     router.app.$nextTick(() => router.app.$loading.start())
    }

    // Get the middleware for all the matched components.
    const middleware = getMiddleware(to.meta)
    
    // Call each middleware.
    callMiddleware(middleware, to, from, (...args) => {
        // Set the application layout only if "next()" was called with no args.
        if (args.length === 0) {
            router.app.setLayout(to.meta.layout || '')
        }

        next(...args)
    })
}

async function afterEach(to, from, next) {

}

