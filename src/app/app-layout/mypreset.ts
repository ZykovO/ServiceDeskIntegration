//telegram-preset.ts
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const TelegramPreset = definePreset(Aura, {
  semantic: {
    // Основные цвета Telegram
    primary: {
      50: '#e8f4fd',
      100: '#d1e9fb',
      200: '#a3d2f7',
      300: '#75bcf3',
      400: '#47a5ef',
      500: '#2ea6ff', // Основной синий Telegram
      600: '#1a8eeb',
      700: '#1571bc',
      800: '#10558d',
      900: '#0b385e',
      950: '#061c2f'
    },

    // Цветовые схемы
    colorScheme: {
      light: {
        // Основные цвета
        primary: {
          color: '#2ea6ff',
          inverseColor: '#ffffff',
          hoverColor: '#1a8eeb',
          activeColor: '#1571bc'
        },

        // Подсветка и выделение
        highlight: {
          background: '#2ea6ff',
          focusBackground: '#1a8eeb',
          color: '#ffffff',
          focusColor: '#ffffff'
        },

        // Поверхности (карточки, панели)
        surface: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#f3f4f5',
          200: '#e8e9ea',
          300: '#e1e3e6',
          400: '#d4d6d9',
          500: '#c4c7cc',
          600: '#9e9e9e',
          700: '#707579',
          800: '#424242',
          900: '#212121',
          950: '#000000'
        },

        // Текст
        text: {
          color: '#000000',
          hoverColor: '#2ea6ff',
          mutedColor: '#707579',
          inverseColor: '#ffffff'
        },

        // Границы
        border: {
          color: '#e1e3e6'
        },

        // Фон контента
        content: {
          background: '#ffffff',
          hoverBackground: '#f3f4f5',
          borderColor: '#e1e3e6',
          color: '#000000',
          hoverColor: '#2ea6ff'
        },

        // Навигация
        navigation: {
          item: {
            focusBackground: '#f3f4f5',
            activeBackground: '#2ea6ff',
            color: '#000000',
            focusColor: '#000000',
            activeColor: '#ffffff',
            icon: {
              color: '#707579',
              focusColor: '#2ea6ff',
              activeColor: '#ffffff'
            }
          }
        },

        // Маски (модальные окна)
        mask: {
          background: 'rgba(0,0,0,.4)',
          color: '#ffffff'
        },

        // Формы
        formField: {
          background: '#ffffff',
          disabledBackground: '#f3f4f5',
          filledBackground: '#ffffff',
          filledFocusBackground: '#ffffff',
          borderColor: '#e1e3e6',
          hoverBorderColor: '#c4c7cc',
          focusBorderColor: '#2ea6ff',
          invalidBorderColor: '#ff3b30',
          color: '#000000',
          disabledColor: '#707579',
          placeholderColor: '#707579',
          floatLabelColor: '#707579',
          floatLabelFocusColor: '#2ea6ff',
          floatLabelInvalidColor: '#ff3b30',
          iconColor: '#707579'
        },

        // Список
        list: {
          option: {
            focusBackground: '#f3f4f5',
            selectedBackground: '#2ea6ff',
            selectedFocusBackground: '#1a8eeb',
            color: '#000000',
            focusColor: '#000000',
            selectedColor: '#ffffff',
            selectedFocusColor: '#ffffff',
            icon: {
              color: '#707579',
              focusColor: '#707579'
            }
          }
        },

        // Overlay панели
        overlayPanel: {
          background: '#ffffff',
          borderColor: '#e1e3e6',
          color: '#000000',
          shadow: '0 2px 12px rgba(0,0,0,0.15)'
        },

        // Popover
        popover: {
          background: '#ffffff',
          borderColor: '#e1e3e6',
          color: '#000000',
          shadow: '0 2px 12px rgba(0,0,0,0.15)'
        },

        // Tooltip
        tooltip: {
          background: '#424242',
          color: '#ffffff'
        },

        // Кнопки
        button: {
          primaryBackground: '#2ea6ff',
          primaryHoverBackground: '#1a8eeb',
          primaryActiveBackground: '#1571bc',
          primaryBorderColor: '#2ea6ff',
          primaryHoverBorderColor: '#1a8eeb',
          primaryActiveBorderColor: '#1571bc',
          primaryColor: '#ffffff',
          primaryHoverColor: '#ffffff',
          primaryActiveColor: '#ffffff',

          secondaryBackground: '#f3f4f5',
          secondaryHoverBackground: '#e8e9ea',
          secondaryActiveBackground: '#d4d6d9',
          secondaryBorderColor: '#f3f4f5',
          secondaryHoverBorderColor: '#e8e9ea',
          secondaryActiveBorderColor: '#d4d6d9',
          secondaryColor: '#000000',
          secondaryHoverColor: '#000000',
          secondaryActiveColor: '#000000',

          infoBackground: '#2ea6ff',
          infoHoverBackground: '#1a8eeb',
          infoActiveBackground: '#1571bc',
          infoBorderColor: '#2ea6ff',
          infoHoverBorderColor: '#1a8eeb',
          infoActiveBorderColor: '#1571bc',
          infoColor: '#ffffff',
          infoHoverColor: '#ffffff',
          infoActiveColor: '#ffffff',

          successBackground: '#34c759',
          successHoverBackground: '#30d158',
          successActiveBackground: '#28a745',
          successBorderColor: '#34c759',
          successHoverBorderColor: '#30d158',
          successActiveBorderColor: '#28a745',
          successColor: '#ffffff',
          successHoverColor: '#ffffff',
          successActiveColor: '#ffffff',

          warnBackground: '#ff9500',
          warnHoverBackground: '#ff8c00',
          warnActiveBackground: '#e6851f',
          warnBorderColor: '#ff9500',
          warnHoverBorderColor: '#ff8c00',
          warnActiveBorderColor: '#e6851f',
          warnColor: '#ffffff',
          warnHoverColor: '#ffffff',
          warnActiveColor: '#ffffff',

          helpBackground: '#2ea6ff',
          helpHoverBackground: '#1a8eeb',
          helpActiveBackground: '#1571bc',
          helpBorderColor: '#2ea6ff',
          helpHoverBorderColor: '#1a8eeb',
          helpActiveBorderColor: '#1571bc',
          helpColor: '#ffffff',
          helpHoverColor: '#ffffff',
          helpActiveColor: '#ffffff',

          dangerBackground: '#ff3b30',
          dangerHoverBackground: '#ff2d1b',
          dangerActiveBackground: '#d70015',
          dangerBorderColor: '#ff3b30',
          dangerHoverBorderColor: '#ff2d1b',
          dangerActiveBorderColor: '#d70015',
          dangerColor: '#ffffff',
          dangerHoverColor: '#ffffff',
          dangerActiveColor: '#ffffff',

          contrastBackground: '#000000',
          contrastHoverBackground: '#424242',
          contrastActiveBackground: '#212121',
          contrastBorderColor: '#000000',
          contrastHoverBorderColor: '#424242',
          contrastActiveBorderColor: '#212121',
          contrastColor: '#ffffff',
          contrastHoverColor: '#ffffff',
          contrastActiveColor: '#ffffff'
        },

        // Меню
        menubar: {
          background: '#ffffff',
          borderColor: '#e1e3e6',
          color: '#000000'
        },

        // Меню
        menu: {
          background: '#ffffff',
          borderColor: '#e1e3e6',
          color: '#000000',
          overlayBackground: '#ffffff',
          overlayBorderColor: '#e1e3e6',
          overlayColor: '#000000',
          overlayBorderRadius: '10px',
          overlayShaddow: '0 2px 12px rgba(0,0,0,0.15)',
          item: {
            focusBackground: '#f3f4f5',
            activeBackground: '#2ea6ff',
            color: '#000000',
            focusColor: '#000000',
            activeColor: '#ffffff',
            icon: {
              color: '#707579',
              focusColor: '#2ea6ff',
              activeColor: '#ffffff'
            }
          }
        }
      },

      dark: {
        // Основные цвета для темной темы
        primary: {
          color: '#2ea6ff',
          inverseColor: '#0f0f0f',
          hoverColor: '#47a5ef',
          activeColor: '#75bcf3'
        },

        highlight: {
          background: '#2ea6ff',
          focusBackground: '#47a5ef',
          color: '#ffffff',
          focusColor: '#ffffff'
        },

        // Поверхности темной темы
        surface: {
          0: '#0f0f0f',
          50: '#1a1a1a',
          100: '#212121',
          200: '#2c2c2e',
          300: '#3a3a3c',
          400: '#48484a',
          500: '#636366',
          600: '#8e8e93',
          700: '#aeaeb2',
          800: '#c7c7cc',
          900: '#f2f2f7',
          950: '#ffffff'
        },

        // Текст темной темы
        text: {
          color: '#ffffff',
          hoverColor: '#2ea6ff',
          mutedColor: '#8e8e93',
          inverseColor: '#000000'
        },

        // Границы темной темы
        border: {
          color: '#3a3a3c'
        },

        // Контент темной темы
        content: {
          background: '#0f0f0f',
          hoverBackground: '#212121',
          borderColor: '#3a3a3c',
          color: '#ffffff',
          hoverColor: '#2ea6ff'
        },

        navigation: {
          item: {
            focusBackground: '#212121',
            activeBackground: '#2ea6ff',
            color: '#ffffff',
            focusColor: '#ffffff',
            activeColor: '#ffffff',
            icon: {
              color: '#8e8e93',
              focusColor: '#2ea6ff',
              activeColor: '#ffffff'
            }
          }
        },

        mask: {
          background: 'rgba(0,0,0,.6)',
          color: '#ffffff'
        },

        formField: {
          background: '#212121',
          disabledBackground: '#2c2c2e',
          filledBackground: '#212121',
          filledFocusBackground: '#212121',
          borderColor: '#3a3a3c',
          hoverBorderColor: '#48484a',
          focusBorderColor: '#2ea6ff',
          invalidBorderColor: '#ff453a',
          color: '#ffffff',
          disabledColor: '#8e8e93',
          placeholderColor: '#8e8e93',
          floatLabelColor: '#8e8e93',
          floatLabelFocusColor: '#2ea6ff',
          floatLabelInvalidColor: '#ff453a',
          iconColor: '#8e8e93'
        },

        list: {
          option: {
            focusBackground: '#212121',
            selectedBackground: '#2ea6ff',
            selectedFocusBackground: '#47a5ef',
            color: '#ffffff',
            focusColor: '#ffffff',
            selectedColor: '#ffffff',
            selectedFocusColor: '#ffffff',
            icon: {
              color: '#8e8e93',
              focusColor: '#8e8e93'
            }
          }
        },

        overlayPanel: {
          background: '#212121',
          borderColor: '#3a3a3c',
          color: '#ffffff',
          shadow: '0 2px 12px rgba(0,0,0,0.4)'
        },

        popover: {
          background: '#212121',
          borderColor: '#3a3a3c',
          color: '#ffffff',
          shadow: '0 2px 12px rgba(0,0,0,0.4)'
        },

        tooltip: {
          background: '#48484a',
          color: '#ffffff'
        },

        // Кнопки темной темы
        button: {
          primaryBackground: '#2ea6ff',
          primaryHoverBackground: '#47a5ef',
          primaryActiveBackground: '#75bcf3',
          primaryBorderColor: '#2ea6ff',
          primaryHoverBorderColor: '#47a5ef',
          primaryActiveBorderColor: '#75bcf3',
          primaryColor: '#ffffff',
          primaryHoverColor: '#ffffff',
          primaryActiveColor: '#ffffff',

          secondaryBackground: '#2c2c2e',
          secondaryHoverBackground: '#3a3a3c',
          secondaryActiveBackground: '#48484a',
          secondaryBorderColor: '#2c2c2e',
          secondaryHoverBorderColor: '#3a3a3c',
          secondaryActiveBorderColor: '#48484a',
          secondaryColor: '#ffffff',
          secondaryHoverColor: '#ffffff',
          secondaryActiveColor: '#ffffff',

          infoBackground: '#2ea6ff',
          infoHoverBackground: '#47a5ef',
          infoActiveBackground: '#75bcf3',
          infoBorderColor: '#2ea6ff',
          infoHoverBorderColor: '#47a5ef',
          infoActiveBorderColor: '#75bcf3',
          infoColor: '#ffffff',
          infoHoverColor: '#ffffff',
          infoActiveColor: '#ffffff',

          successBackground: '#32d74b',
          successHoverBackground: '#30db5b',
          successActiveBackground: '#28cd41',
          successBorderColor: '#32d74b',
          successHoverBorderColor: '#30db5b',
          successActiveBorderColor: '#28cd41',
          successColor: '#ffffff',
          successHoverColor: '#ffffff',
          successActiveColor: '#ffffff',

          warnBackground: '#ff9f0a',
          warnHoverBackground: '#ffb340',
          warnActiveBackground: '#cc7c08',
          warnBorderColor: '#ff9f0a',
          warnHoverBorderColor: '#ffb340',
          warnActiveBorderColor: '#cc7c08',
          warnColor: '#ffffff',
          warnHoverColor: '#ffffff',
          warnActiveColor: '#ffffff',

          helpBackground: '#2ea6ff',
          helpHoverBackground: '#47a5ef',
          helpActiveBackground: '#75bcf3',
          helpBorderColor: '#2ea6ff',
          helpHoverBorderColor: '#47a5ef',
          helpActiveBorderColor: '#75bcf3',
          helpColor: '#ffffff',
          helpHoverColor: '#ffffff',
          helpActiveColor: '#ffffff',

          dangerBackground: '#ff453a',
          dangerHoverBackground: '#ff6961',
          dangerActiveBackground: '#d70015',
          dangerBorderColor: '#ff453a',
          dangerHoverBorderColor: '#ff6961',
          dangerActiveBorderColor: '#d70015',
          dangerColor: '#ffffff',
          dangerHoverColor: '#ffffff',
          dangerActiveColor: '#ffffff',

          contrastBackground: '#ffffff',
          contrastHoverBackground: '#f2f2f7',
          contrastActiveBackground: '#e5e5ea',
          contrastBorderColor: '#ffffff',
          contrastHoverBorderColor: '#f2f2f7',
          contrastActiveBorderColor: '#e5e5ea',
          contrastColor: '#000000',
          contrastHoverColor: '#000000',
          contrastActiveColor: '#000000'
        },

        menubar: {
          background: '#212121',
          borderColor: '#3a3a3c',
          color: '#ffffff'
        },

        menu: {
          background: '#212121',
          borderColor: '#3a3a3c',
          color: '#ffffff',
          overlayBackground: '#212121',
          overlayBorderColor: '#3a3a3c',
          overlayColor: '#ffffff',
          overlayBorderRadius: '10px',
          overlayShaddow: '0 2px 12px rgba(0,0,0,0.4)',
          item: {
            focusBackground: '#2c2c2e',
            activeBackground: '#2ea6ff',
            color: '#ffffff',
            focusColor: '#ffffff',
            activeColor: '#ffffff',
            icon: {
              color: '#8e8e93',
              focusColor: '#2ea6ff',
              activeColor: '#ffffff'
            }
          }
        }
      }
    }
  },

  // Компонентные стили
  components: {
    // Карточки в стиле Telegram
    card: {
      root: {
        background: '{content.background}',
        borderRadius: '12px',
        color: '{content.color}',
        shadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      },
      body: {
        padding: '16px',
        gap: '16px'
      },
      caption: {
        gap: '8px'
      },
      title: {
        fontSize: '18px',
        fontWeight: '600'
      },
      subtitle: {
        color: '{text.muted.color}',
      }
    },

    // Кнопки в стиле Telegram
    button: {
      root: {
        borderRadius: '10px',
        paddingX: '16px',
        paddingY: '12px',
        gap: '8px',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '2px',
          style: 'solid',
          offset: '2px',
        }
      },
    },

    // Поля ввода в стиле Telegram
    inputtext: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        borderRadius: '8px',
        paddingX: '12px',
        paddingY: '12px',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: 'rgba(46, 166, 255, 0.2)',
          offset: '0',
          shadow: 'none'
        }
      }
    },

    // Textarea в стиле Telegram
    textarea: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        borderRadius: '8px',
        paddingX: '12px',
        paddingY: '12px',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: 'rgba(46, 166, 255, 0.2)',
          offset: '0',
          shadow: 'none'
        }
      }
    },

    // Select в стиле Telegram - ИСПРАВЛЕНО
    select: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        borderRadius: '8px',
        paddingX: '12px',
        paddingY: '12px',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: 'rgba(46, 166, 255, 0.2)',
          offset: '0',
          shadow: 'none'
        }
      },
      dropdown: {
        width: '32px',
        color: '{form.field.icon.color}'
      },
      overlay: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '8px',
        color: '{content.color}',
        shadow: '0 4px 12px rgba(0,0,0,0.15)'
      },
      list: {
        padding: '4px',
        gap: '2px'
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '8px 12px',
        borderRadius: '6px'
      },
      optionGroup: {
        background: 'transparent',
        color: '{text.muted.color}',
        fontWeight: '600',
        padding: '8px 12px'
      },
      checkmark: {
        color: '{list.option.color}',
        gutterStart: '8px',
        gutterEnd: '8px'
      },
      emptyMessage: {
        padding: '8px 12px',
        // background: 'transparent',
        // color: '{text.muted.color}'
      }
    },

    // MultiSelect в стиле Telegram - ДОБАВЛЕНО
    multiselect: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        borderRadius: '8px',
        paddingX: '12px',
        paddingY: '12px',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: 'rgba(46, 166, 255, 0.2)',
          offset: '0',
          shadow: 'none'
        }
      },
      dropdown: {
        width: '32px',
        color: '{form.field.icon.color}'
      },
      overlay: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '8px',
        color: '{content.color}',
        shadow: '0 4px 12px rgba(0,0,0,0.15)'
      },
      list: {
        padding: '4px',
        gap: '2px'
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '8px 12px',
        borderRadius: '6px'
      },
      optionGroup: {
        background: 'transparent',
        color: '{text.muted.color}',
        fontWeight: '600',
        padding: '8px 12px'
      },
      chip: {
        borderRadius: '16px',
        // paddingX: '8px',
        // paddingY: '4px',
        // background: '{primary.color}',
        // color: '{primary.inverse.color}'
      },
      emptyMessage: {
        padding: '8px 12px',
        // background: 'transparent',
        // color: '{text.muted.color}'
      }
    },

    // Всплывающие панели
    overlaypanel: {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '10px',
        shadow: '{overlay.popover.shadow}',
        gutter: '8px',
        arrowOffset: '16px'
      },
      content: {
        padding: '16px',
        gap: '8px'
      }
    },

    // Tooltip
    tooltip: {
      root: {
        maxWidth: '200px',
        gutter: '8px',
        shadow: '{overlay.tooltip.shadow}',
        padding: '8px 12px',
        borderRadius: '6px'
      },
    },

    // Меню
    menu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '10px',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{transition.duration}'
      },
      list: {
        padding: '8px',
        gap: '2px'
      },
      item: {
        borderRadius: '8px',
        padding: '8px 12px',
        gap: '8px'
      },
      separator: {
        borderColor: '{content.border.color}',
      }
    }
  }
});
