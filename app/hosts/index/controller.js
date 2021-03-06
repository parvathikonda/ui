import Ember from 'ember';
import C from 'ui/utils/constants';
import { headersWithoutHost as containerHeaders } from 'ui/components/container-table/component';

export default Ember.Controller.extend({
  prefs: Ember.inject.service(),

  mode: 'list',
  sortBy: 'name',
  queryParams: ['mode','sortBy'],
  expandedHosts: null,
  searchText: '',

  containerHeaders: containerHeaders,

  init() {
    this._super(...arguments);
    this.set('expandedHosts',[]);
  },

  actions: {
    newContainer(hostId) {
      this.transitionToRoute('containers.new', {queryParams: {hostId: hostId}});
    },

    toggleExpand(hostId) {
      let list = this.get('expandedHosts');
      if ( list.includes(hostId) ) {
        list.removeObject(hostId);
      } else {
        list.addObject(hostId);
      }
    },
  },

  listLinkOptions: {
    route: 'hosts',
    options: {
      mode: 'dot',
    },
  },

  groupLinkOptions: {
    route: 'hosts',
    options: {
      mode: 'grouped',
    },
  },

  headers: [
    {
      name: 'stateSort',
      sort: ['stateSort','displayName'],
      searchField: 'displayState',
      translationKey: 'hostsPage.index.table.state',
      width: '120px'
    },
    {
      name: 'name',
      sort: ['displayName','id'],
      searchField: 'displayName',
      translationKey: 'hostsPage.index.table.name',
    },
    {
      name: 'ip',
      sort: ['displayIp','displayName'],
      searchField: 'displayIp',
      translationKey: 'hostsPage.index.table.ip',
      width: '160px',
    },
    {
      name: 'memory',
      sort: ['memory','displayName'],
      searchField: 'memoryBlurb',
      width: '80px',
      icon: 'icon icon-lg icon-memory',
    },
    {
      name: 'docker',
      sort: ['dockerEngineVersion','displayName'],
      searchField: 'dockerEngineVersion',
      width: '75px',
      icon: 'icon icon-lg icon-docker',
    },
    {
      name: 'instanceCount',
      sort: ['instances.length:desc','displayName'],
      searchField: null,
      width: '80px',
      icon: 'icon icon-lg icon-container',
    },
    {
      name: 'instanceState',
      sort: ['instanceCountSort:desc','displayName'],
      searchField: null,
      width: '150px',
      translationKey: 'hostsPage.index.table.instanceState',
    },
    {
      isActions: true,
      width: '40px',
    },
  ],

  extraSearchFields: [
    'displayUserLabelStrings',
    'requireAnyLabelStrings',
  ],

  extraSearchSubFields: [
    'displayUserLabelStrings',
  ],

  modeChanged: function() {
    let key = `prefs.${C.PREFS.HOST_VIEW}`;
    let cur = this.get(key);
    let neu = this.get('mode');
    if ( cur !== neu ) {
      this.set(key,neu);
    }
  }.observes('mode'),
});
