import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import styles from './Project.module.css'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(ru)
const cx = classNames.bind(styles)
const timeAgo = new TimeAgo('ru-RU')

export default function Project({ title, icon, url, git, vercel, links }) {
    const [branches, setSlots] = useState([]);

    useEffect(() => {
        (async () => {
            const branches = await getSlots(git, vercel);
            setSlots(branches);
        })();
    }, []);

    return (
        <article className={cx("project")}>
            <header className={cx("project__meta")}>
                {
                    icon
                        ? <img className={cx("project__icon")} src={`/images/${icon}`} alt="" />
                        : <span className={cx("project__letter")}>{title.charAt(0)}</span>
                }
                <h2 className={cx("project__title")}>
                    {title}
                    {git && (
                        <a href={`https://github.com/ekaterinburgdesign/${git}`} target="_blank" rel="noreferrer">
                            <img className={cx("project__github-icon")} src={"/images/github.png"} alt="" />
                        </a>
                    )}
                </h2>
            </header>

            <ul className={cx("project__slots-list")}>
                <li className={cx("project__slots-list-item", "project__slots-list-item_production")}>
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className={cx("project__slots-link")}
                    >
                        {new URL(url).host}
                    </a>
                </li>

                {branches.map(({ slotUrl, date, commitMessage, commitUrl, commitAuthor }) =>
                    <li className={cx("project__slots-list-item")} key={commitUrl}>
                        <a
                            href={slotUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={cx("project__slots-link")}
                        >
                            {new URL(slotUrl).host.replace('.vercel.app', '')}
                        </a>
                        <div className={cx("project__slots-commit")}>
                            <a
                                href={commitUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                #
                            </a> {timeAgo.format(new Date(date))} {commitAuthor} {commitMessage} 
                        </div>
                    </li>
                )}
            </ul>

            {/* slotUrl,
            date: commitT.data.commit.committer.date,
            commitUrl: commitT.data.html_url,
            commitAuthor: commitT.data.commit.committer.name */}

            <ul className={cx("project__other-list")}>
                {links.map(({ name, url }) => (
                    <li className={cx("project__other-list-item")} key={name}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className={cx("project__other-link")}
                        >
                            {name}
                        </a>
                    </li>
                ))}
            </ul>

        </article>
    )
}

async function getSlots(repo, vercel) {
    const response = await fetch(`/api/slots?repo=${repo}&vercel=${vercel}`);
    return await response.json();
}