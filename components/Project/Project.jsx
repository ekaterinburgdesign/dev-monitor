import classNames from 'classnames/bind'
import styles from './Project.module.css'

const cx = classNames.bind(styles)

export default function Project({ title, icon, url, git, links }) {
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
                        <a href={`https://github.com/ekaterinburgdesign/${git}`} target="_blank">
                            <img className={cx("project__github-icon")} src={"/images/github.png"} alt="" />
                        </a>
                    )}
                </h2>
            </header>

            <ul className={cx("project__slots-list")}>
                <li className={cx("project__slots-list-item")}>
                    <a
                        href={url}
                        target="_blank"
                        className={cx("project__slots-link")}
                    >
                        {new URL(url).host}
                    </a>
                </li>
            </ul>

            <ul className={cx("project__other-list")}>
                {links.map(({ name, url }) => (
                    <li className={cx("project__other-list-item")}>
                        <a
                            href={url}
                            target="_blank"
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

