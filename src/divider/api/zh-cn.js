module.exports = [
    {
        type: 'component',
        name: 'thy-divider',
        description: '分割线',
        properties: [
            {
                name: 'thyVertical',
                description: '是否垂直方向',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyStyle',
                description: "是否虚线 'solid' | 'dashed'",
                type: 'string',
                default: "'solid'"
            },
            {
                name: 'thyText',
                description: '中间内容',
                type: 'string | TemplateRef',
                default: '-'
            },
            {
                name: 'thyTextDirection',
                description: "中间内容位置 'left' | 'right' | 'center'",
                type: 'string',
                default: "'center'"
            },
            {
                name: 'thyDeeper',
                description: '默认的分割线颜色为`#eee`, thyDeeper 传 true 时颜色加深, 为`#ddd`',
                type: 'boolean',
                default: "'false'"
            }
        ]
    }
];
