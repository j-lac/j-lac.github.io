---
layout: subpage
page: about
title: メンバー
heading: メンバー
permalink: /about/member/
---

## 代表

{% for m in site.data.members.representatives -%}
- {% if m.researchmap %}[{{ m.name }}]({{ m.researchmap }}){:target="_blank" rel="noopener"}{% else %}{{ m.name }}{% endif %}（{{ m.affiliation }}）
{% endfor %}

## メンバー

{% for m in site.data.members.members -%}
- {% if m.researchmap %}[{{ m.name }}]({{ m.researchmap }}){:target="_blank" rel="noopener"}{% else %}{{ m.name }}{% endif %}（{{ m.affiliation }}）
{% endfor %}

## コラボレーター

J-LAC の研究活動には、全国の以下の都道府県の研究者・臨床家にご協力いただいています。

{% include japan-map.html %}
