
+function ($) { "use strict";
    var MultiLevelMenu = function () {
        this.element  = '[data-toggle="multilevel-menu"]';
        this.mainMenu = 'main-menu';
        this.subMenu = 'submenu';
        this.viewOpen = 'subMenuOpen';
        this.viewOnly = 'subMenuView';
        this.animationIn = 'animate-in';
        this.animationOut = 'animate-out';
        this.tmpMenu = 'tmpMenu';
        
        return this;
    };
    
    MultiLevelMenu.prototype.actions = {
        _expand: function (elem) {
            //Expand Menu
            var subMenuElem = elem.children('.' + multilevelmenu.subMenu+':first').prepend('<li class="menu-back"><a href="#"><b class="fa fa-caret-left"></b> Zpět</a></li>'),
                tmpMenuElem = subMenuElem.clone(),
                 styleClass = multilevelmenu.animationIn,
                     parent = elem.closest('.' + multilevelmenu.viewOpen).length <= 0 ? 
                                elem.closest('.' + multilevelmenu.mainMenu)
                                    : elem.closest('.' + multilevelmenu.viewOpen);

            parent.addClass(multilevelmenu.animationOut);
            $(multilevelmenu.element).append(MultiLevelMenu.prototype.actions._createTempMenu(tmpMenuElem, styleClass));

            setTimeout(function() {
              $('#'+multilevelmenu.tmpMenu).remove();
              elem.addClass(multilevelmenu.viewOpen);
              parent.removeClass(multilevelmenu.animationOut +' '+ multilevelmenu.viewOpen);
              parent.addClass(multilevelmenu.viewOnly);
            }, 400);
            
        }
        
        , _expandOut: function (elem) {
            //Expand Out Menu
            var viewOpen     = elem.closest('.' + multilevelmenu.viewOpen),
                tobeOpen     = elem.closest('.' + multilevelmenu.viewOnly),
                grandParent  = elem.parents('.' + multilevelmenu.mainMenu),
                viewOpenMenu = viewOpen.closest('.' + multilevelmenu.subMenu).clone(),
                styleClass   = multilevelmenu.animationOut;
    
            grandParent.addClass(multilevelmenu.animationIn);
            viewOpen.removeClass(multilevelmenu.viewOpen);
            tobeOpen.removeClass(multilevelmenu.viewOnly);
            tobeOpen.addClass(multilevelmenu.viewOpen);
            $(multilevelmenu.element).append(MultiLevelMenu.prototype.actions._createTempMenu(viewOpenMenu, styleClass));
            
            setTimeout(function() {
                $('#'+multilevelmenu.tmpMenu).remove();
                grandParent.removeClass(multilevelmenu.animationIn);
                elem.remove();
            }, 400);
        }
        
        , _createTempMenu: function (tmpMenu, styleClass) {
            //Create a temporary Menu
            if (styleClass == multilevelmenu.animationIn) {
                tmpMenu.css('opacity','0');
            }
            
            tmpMenu.addClass(styleClass);
            tmpMenu.attr('id', multilevelmenu.tmpMenu);
            
            return tmpMenu;
        }
      
        , _resetMenu: function () {
            //Reset the menu
          $('.' + multilevelmenu.mainMenu).find('li').removeClass(multilevelmenu.viewOpen + ' ' + multilevelmenu.viewOnly);
          $('.' + multilevelmenu.mainMenu).removeClass(multilevelmenu.viewOpen + ' ' + multilevelmenu.viewOnly);
          $('.menu-back').remove();
        }
        
    };
    
    MultiLevelMenu.prototype.start = function () {
        $('.menu-btn').click(function() {
            var child = $(this).next('.main-menu');
            
            if ($(this).hasClass('menu-btn-active')){
              MultiLevelMenu.prototype.actions._resetMenu();
            }
            $(this).toggleClass('menu-btn-active');
          
            child.toggleClass('main-menuopen main-menu-toggle');
            setTimeout(function() {
                child.removeClass('main-menu-toggle')
            }, 300);
        });
        
        $('li').click(function(e){
            e.stopPropagation();
            MultiLevelMenu.prototype.actions._expand($(this));
        });
        
        $('ul').on('click', '.menu-back', function (e) {
            e.stopPropagation();
            MultiLevelMenu.prototype.actions._expandOut($(this));
        });
        
        return;
    };
    
    window.multilevelmenu = new MultiLevelMenu();
    
    $(document).on('load', multilevelmenu.start());

}(window.jQuery);
