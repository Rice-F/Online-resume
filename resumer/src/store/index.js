import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
      ],
      profile: {
        name: '张三',
        city: '南京',
        title: '前端',
        birthday: '1990-01-01'
      },
      workHistory: [
        {
          company: '骑行减肥',
          content: '公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定' },
        {
          company: '小学生公司',
          content: '公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信' },
      ],
      education: [
        { school: '皇家理工大学', content: '本科'},
        { school: '和尚大学', content: '硕士'},
      ],
      projects: [
        { name: 'project A', content: '研发'},
        { name: 'project B', content: '研发'},
      ],
      awards: [
        { name: '再来十瓶', content: '连续十次获得「再来一瓶」奖励' },
        { name: '三好学生' },
      ],
      contacts: [
        { contact: 'phone', content: '13812345678' },
        { contact: 'qq', content: '12345678' },
      ]
    }
  },
  mutations: {
    switchTab(state,payload){
      state.selected = payload;
    }
  }
})
