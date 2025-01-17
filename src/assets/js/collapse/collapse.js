/** Classe para o comportamento Collapse */
export default class Collapse {
   /**
    * Instancia um comportamento collapse
    * @param {object} - Objeto de configuraÃ§Ã£o inicial para destructuring
    * @property {object} trigger - Elemento DOM que representa o acionador do comportmento collapse
    * @property {string} iconToShow - Classe que representa o Ã­cone para mostrar o conteÃºdo (padrÃ£o: fa-chevron-down)
    * @property {string} iconToHide - Classe que representa o Ã­cone para esconder o conteÃºdo (padrÃ£o: fa-chevron-up)
    * @property {boolean} useIcons - true: com Ã­cone | false: sem Ã­cone (padrÃ£o: true)
    */
   constructor({
                  trigger,
                  iconToShow = 'fa-chevron-down',
                  iconToHide = 'fa-chevron-up',
                  useIcons = true,
               }) {
      this.trigger = trigger
      this.useIcons = useIcons
      this.setIconToShow(iconToShow)
      this.setIconToHide(iconToHide)
      this._setTarget()
      this._setUp()
   }

   /**
    * Determina qual elemento DOM Ã© o alvo do comportamento collapse
    * @private
    */
   _setTarget() {
      this.target = document.querySelector(
         `#${this.trigger.getAttribute('data-target')}`
      )
   }

   /**
    * Trata a configuraÃ§Ã£o inicial do comportamento collapse
    * @private
    */
   _setUp() {
      this._setVisibilityStatus()
      if (this.useIcons) {
         this._toggleIcon()
      }
      this.trigger.setAttribute(
         'aria-controls',
         `${this.trigger.getAttribute('data-target')}`
      )
   }

   /**
    * Configura o estado de visualizaÃ§Ã£o do comportamento collapse
    * @private
    */
   _setVisibilityStatus() {
      this._setTriggerVisibilityStatus()
      this._setTargetVisibilityStatus()
   }

   /**
    * Trata o estado de visualizaÃ§Ã£o do acionador
    * @private
    */
   _setTriggerVisibilityStatus() {
      if (this.target.hasAttribute('hidden')) {
         this.trigger.setAttribute('data-visible', false)
         this.trigger.setAttribute('aria-expanded', false)
      } else {
         this.trigger.setAttribute('data-visible', true)
         this.trigger.setAttribute('aria-expanded', true)
      }
   }

   /**
    * Trata o estado de visualizaÃ§Ã£o do alvo
    * @private
    */
   _setTargetVisibilityStatus() {
      if (this.target.hasAttribute('hidden')) {
         this.target.setAttribute('aria-hidden', true)
      } else {
         this.target.setAttribute('aria-hidden', false)
      }
   }

   /**
    * Handler para o evento de click no acionador do comportamento collapse
    * LanÃ§a um evento 'change' a cada troca
    * @private
    */
   _handleTriggerClickBehavior() {
      this._toggleVisibility()
      if (this.useIcons) {
         this._toggleIcon()
      }
      this.trigger.dispatchEvent(new Event('change'))
   }

   /**
    * Alterna o estado de visualizaÃ§Ã£o do comportamento collapse
    * @private
    */
   _toggleVisibility() {
      this.target.hasAttribute('hidden')
         ? this.target.removeAttribute('hidden')
         : this.target.setAttribute('hidden', '')

      this._setVisibilityStatus()
   }

   /**
    * Troca o icone do acionador apÃ³s uma mudanÃ§a no estado de visualizaÃ§Ã£o do alvo
    * Para o estado 'hidden' usa o iconToShow e para o estado 'shown' usa o iconToHide
    * @public
    */
   _toggleIcon() {
      this.trigger.querySelectorAll('i.fas').forEach((icon) => {
         icon.classList.remove(
            this.target.hasAttribute('hidden') ? this.iconToHide : this.iconToShow
         )
         icon.classList.add(
            this.target.hasAttribute('hidden') ? this.iconToShow : this.iconToHide
         )
      })
   }

   /**
    * Configura o comportamento collapse
    * @public
    */
   setBehavior() {
      this.trigger.addEventListener(
         'click',
         this._handleTriggerClickBehavior.bind(this)
      )
   }

   /**
    * Determina a classe do icone para mostrar o conteÃºdo
    * @param {string} iconToShow - Classe que representa o Ã­cone para mostrar o conteÃºdo
    * @public
    */
   setIconToShow(iconToShow) {
      this.iconToShow = iconToShow
   }

   /**
    * Determina a classe do Ã­cone para esconder o conteÃºdo
    * @param {string} iconToHide - Classe que representa o Ã­cone para esconder o conteÃºdo
    * @public
    */
   setIconToHide(iconToHide) {
      this.iconToHide = iconToHide
   }
}
