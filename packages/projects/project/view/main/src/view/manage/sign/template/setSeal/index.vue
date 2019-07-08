<template>
  <div>
    <div class="con">
      <div
        class="con-pdf"
        :loading="loading"
        element-loading-text="正在加载"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <c-pdf
          :pdfurl="$route.query.pdfurl"
          @imgDrop="onDrop"
          @prevPage="handlePrevPage"
          @nextPage="handleNextPage"
        >
          <template
            v-for="(item) in sealStore.corpSeal[pageNum - 1]"
          >
            <vue-draggable-resizable
              v-if="item.flag && isShow && coSeal.needSetSeal"
              :key="item.key"
              :w="140"
              :h="140"
              :x="item.x"
              :y="item.y"
              :parent="true"
              :resizable="false"
              class-name="con-draggable"
              @dragstop="onDragEnd"
            >
              <div
                ref="corpSeal"
                class="con-seal-left"
              >
                <img
                  :src="`data:image/png;base64,${coSeal.sealData}`"
                  class="img"
                  @dragstart="selectCorpItem(item)"
                >
                <i
                  class="el-icon-close del-btn"
                  @click.self="deleteCorpSeal(item)"
                />
              </div>
            </vue-draggable-resizable>
          </template>
          <template
            v-for="(item, index) in sealStore.perSeal[pageNum - 1]"
          >
            <vue-draggable-resizable
              v-if="item.flag && isShow"
              :key="item.key"
              :w="140"
              :h="140"
              :x="item.x"
              :y="item.y"
              :parent="true"
              :resizable="false"
              class-name="con-draggable"
              @dragstop="onDragEndPer"
            >
              <div
                class="con-seal-left"
              >
                <img
                  width="140"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACfCAYAAADnGwvgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5c
                  cllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+ID
                  x4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8
                  xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4g
                  PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmP
                  SJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC
                  8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNTY0ZDNmYy0yOTMwLWNiNGUtODNmZC04YTM5NmFkOTlhNWMiIHhtcE1NOkRvY3VtZW5
                  0SUQ9InhtcC5kaWQ6NDU3RDU0MjlGRjg5MTFFODhGQzM4MjcyRDI2QjI4QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDU3RDU0MjhGRjg5MTFF
                  ODhGQzM4MjcyRDI2QjI4QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGc
                  m9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzNlNjVjZWQtOGI5OS0yMTQ1LThmNzUtNTQyOGNkZDBmZjc0IiBzdFJlZjpkb2N1bWVudElEPSJhZG
                  9iZTpkb2NpZDpwaG90b3Nob3A6OGUwZjRhODEtZWJhOC0xMWU4LWFiNDAtZjQ2MDhlMTU3ZjBjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY
                  +IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1N4w3AAAB9lJREFUeNrsnf1x4kgQR/GV/78lBRyCHAKEIEIQIUAIEIIVAgrBCmEVwpKCbiPg
                  NK5fu/rmQF8I2+t6r4rSgqzRaPSmp2ekq3s4n88zgM/gL5oAkA+QDwD5APkAkA+QDwD5APkAkA+QDwD5APkAkA+QDwD5APkA+QCQD5APAPkA+QCQD5APA
                  PkA+QCQD5APAPkA+QCQD5APAPkA+QD5AJAPkA8A+QD5AJAPkA8A+QD5AJAPkA8A+QD5AJAPkA+QDwD5APkAkA+QDwD5APkAkA/+ZB5//3g40wxA5APkA0
                  A++N45n/v3A80BH8SZyAcMu4B8AMgHyAeAfIB8AJPyeIcyt82naj5l+PLj93QF//P3bNGUd5qorKTZ1NfKa/an4Rqa/fVE58tU3mnC8gpfv+a3+VT1dWV
                  2sWg+o67poSncXiyYYpE5VORn85k3n13zOUwlXxCv2fyS2HlTbn5jea/NJgi4bsoqo31znavW/urGc81du6x8eWM6VHPMstm8qn7v5TW/h3Ocmu/rG9qk
                  1qcP4XpCJz3ofvflLovMW1VoNrY39CBx57hF5CT+TdEukOkclbuxYf++b/n+o7IKbZduX2ivX9oObYOZr58IHTJtyjveEDzS6DxZy/e5O+5TI59FvZmG3
                  NA7nyceJq3851uiUVPWixqx0mem+oZr2OgGLCVMHe0PUXfTEeVeoxtzuhAx5tHvmzgCt5zjp0RY+WNcxA7bpxER9Zfq+3asa6cn1TX+num3XO02KPJNmf
                  O96KItBIcGem0u4HmiPCSJ/l3dEPVSHV+7YePgxFiqQUMD79WZbH/rtehan925rMOsTAbd5JnSknxEJ0yUP5bxuZv9lQTyueBRUfLQ8zQhetYuoqUq79r
                  3T51wbHXDSjf2bxQBXpoL2U0VAW8J866TBNYq51U9eKVtokR+4/KrpW72YciJFD1KF0lzTRTmPteUpFvJ2NVONiyWioDXUpCfbrKwkFCzntewcKlTrrrZ
                  iJa7/YtbUqwp5Fuqcicn3MlFkxA5kubCb03c51ei4NAZok0yQh2DHCeVvXX5zJM7rHRDbtck4KWtgyq3s+t4cXLMXT54daTQsJq5YzZuFKhb8uOyK2qrb
                  Iv2VdTumY7NI9FStUv1GfKFBj/arEsVW+j3kxuq9hqCi569u6s3JkOXFRRd9jp/GSXpiYsodZSnFfp+6IhyIRLtdLOsjKJHKpGoDn7YvkbmO2HozBJ4eS
                  miaYKUSr51R9kvum9df3OJve5//VHybd2a3uZC6C3UQAc1kEWWVHnJ0GEscZEocxOCIZHzcOGchbupljIcmzqGiYWlC72S6eZvC5eXHaOZ4bU6zXXsrsd
                  yzVY32E9WToqq9YX88b3NujpqWJ7ROSwntsnW0k0qclfvo/5mN1agx5ERaK9KHboighOw1EUkarDTgKg1d5EvV+OkQ+TTkF9dGCqPbraZu4XVrfbn8WJu
                  D2rXUQ4dHTjreR0msqUyfpJRqr7v9VSbzd1w2aeNanWcrRtqTfA0WoZZuMla/RHypbpwm1rXA2/+c1hLswgxYm3vpKGmsvWyMUO4iyLWwKH3VhqafQKdq
                  MPsdYMtt+orY+KS9bZoXvdIGbYtUabSvcmc7NZmxcjVhqKl49iieTlWvDHyFbeecIR4foZXuK1NdDYDpcucELnrUJei18kN86lbopn1jCZ1RzLed9ZuKY
                  PNlmNKFx0PkdjFyFtlM/S7MeYJRz37QCRM6ocPDY+V8sekZzmZeutSEWStXCgsqNrsNrfv+s0mDitJnmu9Lv/INgjRviM/PlldlSqYfLUTc3DkUxtc+qym
                  uK7H2ddnr56fR0NsriHx2HMhu/BDkB6lHbUGeVB5e0vcJb1/jDVkcjR328RFOVsLPbn9tcuDx8pZa1HY58bJ7LYXI1In8l340vJJkEw3Zhc1eK79Nhtbd9
                  2gePhX7ri12bfJriWhrGWG3Gd0WPubr8i7VAfIXVR/k1ALxru+j9iu5H1vOZ5Gg8UtM9GeOd/3lM8t2tqbG5d68EaNkOrmrQdOQApF1n1z3LMWnO1FgFQR
                  bzewvvHv/5vhXniRwGamIRKvRi7GHyRvrbr8Z8gd8brV3XO+xy8sni1eXxVKj6/W+tu3Fw80Ky175mVVtLXV/aXL9axOQZjk2utKbpG5vjKE+pWCoiVCD1
                  mCWsS5uHtjp1REtaE/PFEZEsWrlnrOo0laErXjnymfVuUzNV7nM2HddBPQXgqoL/V093gtTtbtTZeTW38Lx2aKXBYJ3x7StwhYtFyX1aWe6Dm3f2nhWkR7
                  jeQM11NFb8LEbbK4kK+2LRUdXYRcD5ng3Eu+IS8k+htkjbUekvtIwJUterYML2VL9Ov6rfP56AdS+5zsxreGbCnJR/8+o0YepS8zF3F7MfWbzDa8vK8FDn
                  mT+R6vgX+hiP42251imeYj26nHa/RjON9LPoBe8vFfr8GngXyAfIB8AMgHyAeAfPD98E84+P9xAJEPkA8A+eB78nA+k+oBkQ+QDwD5APkAkA+QDwD5APkA
                  kA+QDwD5APkAkA+QDwD5APkA+QCQD5APAPkA+QCQD5APAPkA+QCQD5APAPkA+QCQD5APkI8mAOQD5ANAPkA+AOQD5ANAPkA+AOQD5ANAPkA+AOQD5ANAPk
                  A+QD4A5APkA0A+QD4A5APkA0A++HP5V4ABAOIp+GjBqkUOAAAAAElFTkSuQmCC"
                  @dragstart="selectPerItem(item)"
                >
                <i
                  class="el-icon-close del-btn"
                  @click="deletePerSeal(index)"
                />
              </div>
            </vue-draggable-resizable>
          </template>
        </c-pdf>
      </div>
      <div class="con-seal">
        <div class="con-seal-btn">
          <div class="item">
            <img
              v-if="coSeal.needSetSeal && coSeal.sealData"
              id="imgCorp"
              class="img-fixed"
              :src="`data:image/png;base64,${coSeal.sealData}`"
              @dragstart="handleDragType"
            >
          </div>
          <div class="item">
            <img
              id="perWrite"
              class="img-fixed"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACfCAYAAADnGwvgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5c
                  cllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+ID
                  x4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8
                  xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4g
                  PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmP
                  SJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC
                  8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNTY0ZDNmYy0yOTMwLWNiNGUtODNmZC04YTM5NmFkOTlhNWMiIHhtcE1NOkRvY3VtZW5
                  0SUQ9InhtcC5kaWQ6NDU3RDU0MjlGRjg5MTFFODhGQzM4MjcyRDI2QjI4QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDU3RDU0MjhGRjg5MTFF
                  ODhGQzM4MjcyRDI2QjI4QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGc
                  m9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzNlNjVjZWQtOGI5OS0yMTQ1LThmNzUtNTQyOGNkZDBmZjc0IiBzdFJlZjpkb2N1bWVudElEPSJhZG
                  9iZTpkb2NpZDpwaG90b3Nob3A6OGUwZjRhODEtZWJhOC0xMWU4LWFiNDAtZjQ2MDhlMTU3ZjBjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY
                  +IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1N4w3AAAB9lJREFUeNrsnf1x4kgQR/GV/78lBRyCHAKEIEIQIUAIEIIVAgrBCmEVwpKCbiPg
                  NK5fu/rmQF8I2+t6r4rSgqzRaPSmp2ekq3s4n88zgM/gL5oAkA+QDwD5APkAkA+QDwD5APkAkA+QDwD5APkAkA+QDwD5APkA+QCQD5APAPkA+QCQD5APA
                  PkA+QCQD5APAPkA+QCQD5APAPkA+QD5AJAPkA8A+QD5AJAPkA8A+QD5AJAPkA8A+QD5AJAPkA+QDwD5APkAkA+QDwD5APkAkA/+ZB5//3g40wxA5APkA0
                  A++N45n/v3A80BH8SZyAcMu4B8AMgHyAeAfIB8AJPyeIcyt82naj5l+PLj93QF//P3bNGUd5qorKTZ1NfKa/an4Rqa/fVE58tU3mnC8gpfv+a3+VT1dWV
                  2sWg+o67poSncXiyYYpE5VORn85k3n13zOUwlXxCv2fyS2HlTbn5jea/NJgi4bsoqo31znavW/urGc81du6x8eWM6VHPMstm8qn7v5TW/h3Ocmu/rG9qk
                  1qcP4XpCJz3ofvflLovMW1VoNrY39CBx57hF5CT+TdEukOkclbuxYf++b/n+o7IKbZduX2ivX9oObYOZr58IHTJtyjveEDzS6DxZy/e5O+5TI59FvZmG3
                  NA7nyceJq3851uiUVPWixqx0mem+oZr2OgGLCVMHe0PUXfTEeVeoxtzuhAx5tHvmzgCt5zjp0RY+WNcxA7bpxER9Zfq+3asa6cn1TX+num3XO02KPJNmf
                  O96KItBIcGem0u4HmiPCSJ/l3dEPVSHV+7YePgxFiqQUMD79WZbH/rtehan925rMOsTAbd5JnSknxEJ0yUP5bxuZv9lQTyueBRUfLQ8zQhetYuoqUq79r
                  3T51wbHXDSjf2bxQBXpoL2U0VAW8J866TBNYq51U9eKVtokR+4/KrpW72YciJFD1KF0lzTRTmPteUpFvJ2NVONiyWioDXUpCfbrKwkFCzntewcKlTrrrZ
                  iJa7/YtbUqwp5Fuqcicn3MlFkxA5kubCb03c51ei4NAZok0yQh2DHCeVvXX5zJM7rHRDbtck4KWtgyq3s+t4cXLMXT54daTQsJq5YzZuFKhb8uOyK2qrb
                  Iv2VdTumY7NI9FStUv1GfKFBj/arEsVW+j3kxuq9hqCi569u6s3JkOXFRRd9jp/GSXpiYsodZSnFfp+6IhyIRLtdLOsjKJHKpGoDn7YvkbmO2HozBJ4eS
                  miaYKUSr51R9kvum9df3OJve5//VHybd2a3uZC6C3UQAc1kEWWVHnJ0GEscZEocxOCIZHzcOGchbupljIcmzqGiYWlC72S6eZvC5eXHaOZ4bU6zXXsrsd
                  yzVY32E9WToqq9YX88b3NujpqWJ7ROSwntsnW0k0qclfvo/5mN1agx5ERaK9KHboighOw1EUkarDTgKg1d5EvV+OkQ+TTkF9dGCqPbraZu4XVrfbn8WJu
                  D2rXUQ4dHTjreR0msqUyfpJRqr7v9VSbzd1w2aeNanWcrRtqTfA0WoZZuMla/RHypbpwm1rXA2/+c1hLswgxYm3vpKGmsvWyMUO4iyLWwKH3VhqafQKdq
                  MPsdYMtt+orY+KS9bZoXvdIGbYtUabSvcmc7NZmxcjVhqKl49iieTlWvDHyFbeecIR4foZXuK1NdDYDpcucELnrUJei18kN86lbopn1jCZ1RzLed9ZuKY
                  PNlmNKFx0PkdjFyFtlM/S7MeYJRz37QCRM6ocPDY+V8sekZzmZeutSEWStXCgsqNrsNrfv+s0mDitJnmu9Lv/INgjRviM/PlldlSqYfLUTc3DkUxtc+qym
                  uK7H2ddnr56fR0NsriHx2HMhu/BDkB6lHbUGeVB5e0vcJb1/jDVkcjR328RFOVsLPbn9tcuDx8pZa1HY58bJ7LYXI1In8l340vJJkEw3Zhc1eK79Nhtbd9
                  2gePhX7ri12bfJriWhrGWG3Gd0WPubr8i7VAfIXVR/k1ALxru+j9iu5H1vOZ5Gg8UtM9GeOd/3lM8t2tqbG5d68EaNkOrmrQdOQApF1n1z3LMWnO1FgFQR
                  bzewvvHv/5vhXniRwGamIRKvRi7GHyRvrbr8Z8gd8brV3XO+xy8sni1eXxVKj6/W+tu3Fw80Ky175mVVtLXV/aXL9axOQZjk2utKbpG5vjKE+pWCoiVCD1
                  mCWsS5uHtjp1REtaE/PFEZEsWrlnrOo0laErXjnymfVuUzNV7nM2HddBPQXgqoL/V093gtTtbtTZeTW38Lx2aKXBYJ3x7StwhYtFyX1aWe6Dm3f2nhWkR7
                  jeQM11NFb8LEbbK4kK+2LRUdXYRcD5ng3Eu+IS8k+htkjbUekvtIwJUterYML2VL9Ov6rfP56AdS+5zsxreGbCnJR/8+o0YepS8zF3F7MfWbzDa8vK8FDn
                  mT+R6vgX+hiP42251imeYj26nHa/RjON9LPoBe8vFfr8GngXyAfIB8AMgHyAeAfPD98E84+P9xAJEPkA8A+eB78nA+k+oBkQ+QDwD5APkAkA+QDwD5APkA
                  kA+QDwD5APkAkA+QDwD5APkA+QCQD5APAPkA+QCQD5APAPkA+QCQD5APAPkA+QCQD5APkI8mAOQD5ANAPkA+AOQD5ANAPkA+AOQD5ANAPkA+AOQD5ANAPk
                  A+QD4A5APkA0A+QD4A5APkA0A++HP5V4ABAOIp+GjBqkUOAAAAAElFTkSuQmCC"
              @dragstart="handleDragType"
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <affix
      v-show="isShow"
      direction="bottom"
      :offset="0"
    >
    </affix> -->
    <div class="bot-menu">
      <el-button
        :loading="loading"
        type="primary"
        @click="save"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import CPdf from '../../../../../components/CPdf.vue';

export default {
  components: {
    CPdf,
    VueDraggableResizable,
  },
  data() {
    return {
      pdfurl: '',
      sealStore: {
        corpSeal: [],
        perSeal: [],
      },
      loading: false,
      sealPositions: [],
      pageNum: 1,
      corpIndex: 0,
      perIndex: 0,
      sealType: '',
      isShow: false,
      coSeal: {
        needSetSeal: true,
        sealData: '',
      },
    };
  },
  created() {
    this.getContractSeal();
    this.getContractPdfUrl();
    this.coSeal.needSetSeal = this.$route.query.needSetSeal;
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
    this.pdfurl = this.$route.query.pdfurl;
  },
  methods: {
    save() {
      const perPosition = this.sealStore.perSeal.map((item) => {
        const arr = [];
        if (item) {
          item.forEach((ele) => {
            const temp = {
              posPage: ele.page,
              posX: ele.x + 70,
              posY: 842 - ele.y - 70,
              type: 2,
            };
            arr.push(temp);
          });
        }
        return arr;
      });
      const corpPosition = this.sealStore.corpSeal.map((item) => {
        const arr = [];
        if (item) {
          item.forEach((ele) => {
            const temp = {
              posPage: ele.page,
              posX: ele.x + 70,
              posY: 842 - ele.y - 70,
              type: 1,
            };
            arr.push(temp);
          });
        }
        return arr;
      });
      perPosition.forEach((item) => {
        if (item) {
          this.sealPositions.push(...item);
        } else {
          this.sealPositions.push([]);
        }
      });
      if (this.sealPositions.findIndex(item => item.type === 2) === -1) {
        this.$message.info('至少需设置一个个人签章');
        return;
      }
      corpPosition.forEach((item) => {
        if (item) {
          this.sealPositions.push(...item);
        } else {
          this.sealPositions.push([]);
        }
      });
      // this.sealPositions = this.sealPositions.concat(...perPosition || [], ...corpPosition || []);
      this.$api.setContractSeal({
        contractTemplateId: this.$route.query.id,
        sealPositions: this.sealPositions,
      }).then(() => {
        this.$message.success('保存成功');
      });
    },
    getContractSeal() {
      this.$api.getContractSeal({
        contractTemplateId: this.$route.query.id,
      }).then((res) => {
        if (res.coSeal) {
          this.coSeal.sealData = res.coSeal.sealData;
        }
        res.contractTempSealParams.forEach((item, index) => {
          let prop = '';
          if (item.type === 1) {
            prop = 'corpSeal';
          } else {
            prop = 'perSeal';
          }
          let sealArr = this.sealStore[prop][item.posPage - 1];
          if (!sealArr) {
            sealArr = [];
          }
          const obj = {};
          // const num = new Date().getTime();
          obj.key = `${prop}${index}`;
          obj.page = item.posPage;
          obj.x = item.posX - 70;
          obj.y = 842 - item.posY - 70;
          obj.type = item.type;
          obj.flag = true;
          sealArr.push(obj);
          this.$set(this.sealStore[prop], item.posPage - 1, sealArr);
        });
      });
    },
    onDragEnd(x, y) {
      this.corpIndex = undefined;
      if (this.corpIndex) {
        this.sealStore.corpSeal[this.pageNum - 1][this.corpIndex].x = x;
        this.sealStore.corpSeal[this.pageNum - 1][this.corpIndex].y = y;
      }
    },
    onDragEndPer(x, y) {
      this.perIndex = undefined;
      if (this.perIndex) {
        this.sealStore.perSeal[this.pageNum - 1][this.perIndex].x = x;
        this.sealStore.perSeal[this.pageNum - 1][this.perIndex].y = y;
      }
    },
    onDrop(e) {
      let prop = '';
      if (this.sealType === 'corp') {
        prop = 'corpSeal';
      } else {
        prop = 'perSeal';
      }
      const obj = {};
      const num = new Date().getTime();
      obj.key = `${prop}${num}`;
      obj.flag = true;
      obj.x = e.offsetX - 70;
      obj.y = e.offsetY - 70;
      obj.page = this.pageNum;
      let pageArr = this.sealStore[prop][this.pageNum - 1];
      if (!pageArr) {
        pageArr = [];
      }
      pageArr.push(obj);
      this.$set(this.sealStore[prop], this.pageNum - 1, pageArr);
    },
    handlePrevPage(num) {
      this.pageNum = num;
    },
    handleNextPage(num) {
      this.pageNum = num;
    },
    selectCorpItem(item) {
      this.corpIndex = undefined;
      this.corpIndex = this.sealStore.corpSeal[this.pageNum - 1].indexOf(item);
    },
    selectPerItem(item) {
      this.perIndex = undefined;
      this.perIndex = this.sealStore.perSeal[this.pageNum - 1].indexOf(item);
    },
    deleteCorpSeal(item) {
      const index = this.sealStore.corpSeal[this.pageNum - 1].indexOf(item);
      this.corpIndex = undefined;
      this.sealStore.corpSeal[this.pageNum - 1].splice(index, 1);
    },
    deletePerSeal(index) {
      this.corpIndex = undefined;
      this.sealStore.perSeal[this.pageNum - 1].splice(index, 1);
    },
    handleDragType(e) {
      if (e.target.id === 'imgCorp') {
        this.sealType = 'corp';
      } else {
        this.sealType = 'per';
      }
    },
    getContractPdfUrl() {
      this.loading = true;
      this.$api.getContractPdfUrl({
        contractTemplateId: this.$route.query.id,
      }).then((res) => {
        this.pdfurl = res;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  display: flex;
  .con-pdf {
    width: 60%;
    padding: 10px;
    background: #f3f6fb;
    position: relative;
    .con-seal-left {
      position: relative;
      width: 140px;
      height: 140px;
      .img {
        width: 138px;
        height: 138px;
      }
      .del-btn {
        position: absolute;
        top: 0;
        right: 0;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  .con-seal {
    width: 40%;
    background: #f3f6fb;
    .con-seal-btn {
      padding: 10px;
      background: #fff;
      margin: 10px;
      border-radius: 10px;
      width: 300px;
      position: absolute;
      height: 100%;
      right: 0;
    }
    .item {
      margin-bottom: 10px;
      text-align: center;
      img {
        cursor: move;
      }
      .img-fixed {
        width: 140px;
        height: 140px;
        border: 1px dashed rgba(0, 0, 0, 0.8);
      }
    }
  }
}
.center {
    left: 50% !important;
    transform: translateX(-50%) !important;
    bottom: 24px !important;
}
.bot-menu {
    background: #fff;
    padding: 10px;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0px;
    // margin-right: 112px;
}
.con-draggable {
    cursor: move;
    border: 1px dashed rgba(0, 0, 0, 0.8);
}
</style>
