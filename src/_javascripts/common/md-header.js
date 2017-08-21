/**
* 模仿 Google Design 好看的头部
* https://github.com/youknowznm/google-design-site-header
* @author youknowznm
*/

import $ from '../common/jquery.js'

export default function initMDHeader() {

    let $window = $(window).scrollTop(0),
        $body = $('body'),
        $header = $('.md-header'),
        $ripple = $header.children('.ripple'),
        $navButtonsContainer = $header.find('.nav-items'),
        $navButtons = $header.find('.nav-item'),
        $navIndicator = $header.find('.nav-indicator'),
        $rippleLayer = $header.find('.banner'),
        $pageTitle = $rippleLayer.children('.page-title'),
        $shadow = $('.md-header-shadow')

    // 判断是否移动端
    let isMobile = /Android|iPhone|Windows Phone|iPad/i.test(window.navigator.userAgent)
    if (isMobile) {
        $('body').attr('id', 'mobile')
    }

    // 波纹扩散标识
    let rippling = false

    let $navButtonClicked = null

    // 渐显导航按钮组
    setTimeout(function() {
        $navButtonsContainer.addClass('show')
    }, 0)

    $header
        .on('mousedown', '.nav-item', function(evt) {
            let $targetBtn = $(this)
            if (!$targetBtn.hasClass('active')) {
                $ripple
                    .css({
                        // 直接从鼠标系事件中取得相对于页面的坐标
                        left: evt.pageX - 50,
                        // top 值要减掉窗口的垂直滚动偏移
                        top: evt.pageY - 50 - document.body.scrollTop,
                    })
                    .addClass('noneToCircle')
                $navButtonClicked = $targetBtn.addClass('clicking')
            }
        })
        .on('click', '.nav-item', function(evt) {
            let $targetBtn = $(this)
            if (!$targetBtn.hasClass('active') && !rippling) {

                rippling = true

                /*
                按钮下划线动画
                */
                let $currentBtn = $navButtons.filter('.active').removeClass(
                    'active clicking')
                let targetIsAtRight =
                    $navButtons.index($targetBtn) > $navButtons.index(
                        $currentBtn) ? true : false

                let startX, endX

                // 根据目标按钮和当前活动按钮的相对位置，求得提示条的目标起始点坐标
                if (targetIsAtRight) {
                    startX = $currentBtn.position().left
                    endX = $targetBtn.position().left + $targetBtn.innerWidth()
                } else {
                    startX = $targetBtn.position().left
                    endX = $currentBtn.position().left + $currentBtn.innerWidth()
                }

                $navIndicator.css({
                    left: startX,
                    right: endX,
                    width: endX - startX,
                })

                $navButtons.removeClass('clicking')
                $targetBtn.addClass('active')

                // 动画结束时如果目标按钮在右侧，则left为终点坐标，反之为起点坐标
                $navIndicator.animate({
                        width: 0,
                        left: [targetIsAtRight ? endX : startX],
                    },
                    function() {
                        $navIndicator.css({
                            left: 0,
                            width: 0,
                            right: 'auto',
                        })
                    }
                )

                // 主题配色
                changeColorTheme($targetBtn)

                // 改变标题文字
                $pageTitle.text($targetBtn.text())

                // 移动端的波纹处理
                if (isMobile) {
                    $ripple
                        .css({
                            // 从触摸系事件的changedTouches属性中取得相对于页面的坐标
                            left: evt.pageX - 50,
                            top: evt.pageY - 50 - document.body.scrollTop,
                        })
                        .animate({
                                transform: 'scale(18)',
                            },
                            700,
                            function() {
                                rippling = false
                                $ripple.css({
                                    transform: 'scale(0)',
                                })
                            }
                        )
                } else {
                    rippling = false
                }
            }
        })

    $body
        .on('mouseup', function(evt) {
            // 根据事件目标的话，只能判断 mousedown，无法判断 mouseup，因为后者的目标永远是波纹元素。
            // 所以以波纹元素是否已有动画类为标准，决定如何处理
            if ($ripple.hasClass('noneToCircle')) {
                /*
                波纹元素的扩大
                */
                $body.animate({
                    scrollTop: 0
                }, 200, function() {
                    $ripple
                        .css({
                            'animation-play-state': 'paused',
                        })
                        .removeClass('noneToCircle')
                        .addClass('toFullscreen')
                        .css({
                            'animation-play-state': 'running',
                        })
                    setTimeout(function() {
                        // 移除波纹元素的动画类
                        $ripple.removeClass(
                            'noneToCircle toFullscreen'
                        )
                    }, 650)
                })

            }
            //  如果 $navButtonClicked 不为 null，则在它上面触发 click 事件
            if ($navButtonClicked !== null) {
                $navButtonClicked.click()
            }
        })


    $window
        .on('scroll', function(evt) {
            let scTp = document.body.scrollTop
            // 大于一定值时渐隐标题
            if (scTp > 30) {
                $pageTitle.addClass('hidden')
            } else {
                $pageTitle.removeClass('hidden')
            }
            // 根据scrollTop调整banner高度和阴影top
            $shadow.css(
                'top',
                (256 - scTp) < 64 ? 64 : (256 - scTp)
            )
            $rippleLayer.css(
                'height',
                (192 - scTp) < 0 ? 0 : (192 - scTp)
            )
        })

    // 修正.nav-items的宽度
    let w = 0
    $navButtons.each(function() {
        w += $(this).outerWidth()
    })
    $navButtonsContainer.width(w + 10)

    function changeColorTheme($ele) {
        let colorIndex = $navButtons.index($ele) % 5
        let pallete = [
            'silver',
            'gray',
            'yellow',
            'red',
            'blue',
            'green',
        ]
        // 搜索按钮为特殊配色，其它按以上值循环配色
        $ele.hasClass('search') ? $header.attr('data-theme', pallete[5]) :
            $header.attr('data-theme', pallete[colorIndex])
    }

}
